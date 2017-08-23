export const ROUTES = {
  ROOT: { name: '__root__', path: '/' },
  ABOUT: { name: 'about', path: '/about' },
  RESULTS: { name: 'results', path: '/results/:media/:options' },
  PERSON_RESULTS: { name: 'person_results', path: '/person/:personId/:media' }
};

const routes = Object.values(ROUTES);

export default routes;
