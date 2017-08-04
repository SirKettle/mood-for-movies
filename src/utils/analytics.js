
const trackPage = (routePath) => {
  if (window.ga) {
    // console.log('Track page', routePath, `/#${routePath}`);
    window.ga('send', 'pageview', `/#${routePath}`);
  }
};

const trackEvent = (type, key, data) => {
  if (window.ga) {
    // console.log('Track event', type, key, data);
    window.ga('send', {
      hitType: 'event',
      eventCategory: type,
      eventAction: key,
      eventLabel: data
    });
  }
};

export default {
  page: trackPage,
  event: trackEvent
};
