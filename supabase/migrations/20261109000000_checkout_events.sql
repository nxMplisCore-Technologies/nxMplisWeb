create table if not exists public.checkout_events (
  id               bigint generated always as identity primary key,
  event_id         text not null unique,
  event_name       text not null,
  occurred_at      timestamptz not null,
  received_at      timestamptz not null default now(),
  client_id        text,
  checkout_token   text,
  page_url         text,
  utm_source       text,
  utm_medium       text,
  utm_campaign     text,
  utm_content      text,
  products         jsonb,
  value            numeric(12,2),
  currency         text,
  has_contact      boolean,
  city             text,
  province         text,
  zip              text,
  country          text,
  shipping_title   text,
  shipping_price   numeric(12,2),
  payment_gateway  text,
  alert_type       text,
  alert_message    text,
  user_agent       text,
  raw              jsonb
);

create index if not exists checkout_events_occurred_at_idx on public.checkout_events (occurred_at desc);
create index if not exists checkout_events_client_idx on public.checkout_events (client_id, occurred_at);
create index if not exists checkout_events_checkout_idx on public.checkout_events (checkout_token, occurred_at);
create index if not exists checkout_events_name_idx on public.checkout_events (event_name, occurred_at desc);

-- Writes come only from the track-checkout edge function (service role bypasses RLS).
alter table public.checkout_events enable row level security;

-- One row per checkout: furthest step reached, where it dropped, and why.
create or replace view public.checkout_funnel
with (security_invoker = true) as
with steps as (
  select
    checkout_token,
    min(occurred_at)                                                        as started_at,
    max(occurred_at)                                                        as last_event_at,
    max(client_id)                                                          as client_id,
    max(utm_campaign)                                                       as utm_campaign,
    max(utm_content)                                                        as utm_content,
    max(city)                                                               as city,
    max(province)                                                           as province,
    max(zip)                                                                as zip,
    max(value)                                                              as value,
    (array_agg(products order by occurred_at) filter (where products is not null))[1] as products,
    max(shipping_title)                                                     as shipping_title,
    max(shipping_price)                                                     as shipping_price,
    max(payment_gateway)                                                    as payment_gateway,
    bool_or(event_name = 'checkout_started')                               as started,
    bool_or(event_name = 'checkout_contact_info_submitted')                as contact,
    bool_or(event_name = 'checkout_address_info_submitted')                as address,
    bool_or(event_name = 'checkout_shipping_info_submitted')               as shipping,
    bool_or(event_name = 'payment_info_submitted')                         as payment,
    bool_or(event_name = 'checkout_completed')                             as completed,
    string_agg(distinct alert_message, ' | ') filter (where alert_message is not null) as alerts
  from public.checkout_events
  where checkout_token is not null
  group by checkout_token
)
select *,
  case
    when completed then 'completed'
    when payment   then 'dropped_at_payment'
    when shipping  then 'dropped_after_shipping'
    when address   then 'dropped_after_address'
    when contact   then 'dropped_after_contact'
    else 'dropped_before_contact'
  end as outcome
from steps;
