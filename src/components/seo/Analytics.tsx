// GA4 + Performance analytics component
// Replace GA_MEASUREMENT_ID with your actual G-XXXXXXXXXX code
export const GA_MEASUREMENT_ID = 'G-CSW2FEKTDB';

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

        // Track key conversion events
        function trackEvent(action, category, label, value) {
          gtag('event', action, { event_category: category, event_label: label, value: value });
        }

        // Expose for use in components
        window.trackAnvayaEvent = trackEvent;
      `}} />
    </>
  );
}
