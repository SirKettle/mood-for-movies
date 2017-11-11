export const ROUTES = {
  ROOT: { name: '__root__', path: '/' },
  ABOUT: { name: 'about', path: '/about' },
  RESULTS: { name: 'results', path: '/results/:media/:options/:page' },
  PERSON_RESULTS: { name: 'person_results', path: '/people/:personId/:personName/:media/:page' },
  SEARCH: { name: 'search', path: '/search' },
  MOVIE: { name: 'movies', path: '/movies/:lookupId/:lookupName' },
  TV: { name: 'tv', path: '/tv/:lookupId/:lookupName' },
  SETTINGS: { name: 'settings', path: '/settings' }
};

const routes = Object.values(ROUTES);

export default routes;
