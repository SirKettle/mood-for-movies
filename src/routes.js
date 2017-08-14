export const ROUTES = {
  ROOT: { name: '__root__', path: '/' },
  MOVIE: { name: 'movie', path: '/movie' },
  ABOUT: { name: 'about', path: '/about' },
  RESULTS: { name: 'results', path: '/results/:media/:options' }
};

const routes = Object.values(ROUTES);

export default routes;
