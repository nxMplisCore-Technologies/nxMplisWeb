// GA4 + Performance analytics component
// Replace GA_MEASUREMENT_ID with your actual G-XXXXXXXXXX code
export const GA_MEASUREMENT_ID = 'G-CSW2FEKTDB';
export const META_PIXEL_ID = '2351064885629808';

export function GoogleAnalytics() {
  if (process.env.NODE_ENV !== 'production') return null;
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
      <script dangerouslySetInnerHTML={{ __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}', {
          page_path: window.location.pathname,
          send_page_view: true,
        });

        // Track key conversion events — fires GA4 + Meta Pixel
        window.trackAnvayaEvent = function(action, category, label, value) {
          gtag('event', action, { event_category: category, event_label: label, value: value });
          if (window.fbq) {
            if (action === 'preorder_lead') window.fbq('track', 'Lead');
            else if (action === 'cry_analyzed') window.fbq('trackCustom', 'CryAnalyzed', { label: label });
            else window.fbq('trackCustom', action, { category: category, label: label });
          }
        };
      `}} />
    </>
  );
}

export function MetaPixel() {
  if (process.env.NODE_ENV !== 'production') return null;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: `
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${META_PIXEL_ID}');
        fbq('track', 'PageView');
      `}} />
      <noscript>
        <img height="1" width="1" style={{display:'none'}}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
