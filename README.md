# Mood for a movie

An app which suggests movies to watch based on the user's moods

## Tech

Using React, Redux, Router5 and bootstrapped with Webpack2.

Based on this simple [Webpack2 React seed project](https://github.com/tpina/react-webpack2-seed) and then swapping out the react-router for [Router5](https://github.com/router5/redux-router5) using this [redux-router5 example](https://github.com/router5/examples/tree/master/apps/react-redux)

Utilizing 3rd party APIs:
* [TMDb](https://www.themoviedb.org)
* [Netflix Roulette API](https://netflixroulette.net/api/)

Temp example:
```
GET https://netflixroulette.net/api/api.php?title=alladin
```

## How to

**Install dependencies**
```bash
yarn
```
**Run development environment**
```bash
yarn start
```
**Build the development bundle**
```bash
yarn run build-dev
```
**Build the production bundle**
```bash
yarn run build-prod
```
**Run linter**
```bash
yarn run lint
```
**Run tests**
```bash
yarn run test
```

May need to install [watchman](https://facebook.github.io/watchman/docs/install.html) if get errors with FSEvents on OS X.

## License
[MIT license](http://opensource.org/licenses/mit-license.php)
