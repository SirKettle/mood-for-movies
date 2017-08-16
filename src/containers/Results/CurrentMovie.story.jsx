// import React from 'react';
// import Immutable from 'immutable';
// import { storiesOf } from '@storybook/react';
// import { withKnobs, boolean, number, select, text } from '@storybook/addon-knobs';
// import { CurrentMovie } from './CurrentMovie';
// import loadingStates from '../../constants/loadingStates';
// import GENRES from '../../constants/movieGenres';
// import Story from '../../storybook/story';
// // import styles from '../../storybook/story.css';

// const getGenresIds = () => {
//   const genreIds = [];
//   Object.keys(GENRES).forEach((key) => {
//     const genreId = GENRES[key];
//     if (boolean(key, false)) {
//       genreIds.push(genreId);
//     }
//   });
//   return genreIds;
// };

// const getProps = () => ({
//   configuration: Immutable.fromJS({ images: { base_url: 'http://some_base_url/' } }),
//   requestNext: () => { console.log('requestNext'); },
//   moodsKey: 'some_moods_key',
//   loadingStatus: select('loadingStatus', Object.values(loadingStates), loadingStates.COMPLETE),
//   currentMoviePageInfo: {
//     index: 0,
//     display: 1,
//     total: 16
//   },
//   currentMovieNetflix: boolean('Netflix', true) ?
//     Immutable.Map({ show_id: 123456789 }) :
//     null,
//   currentMovieItunes: boolean('iTunes', true) ?
//     Immutable.Map({ trackViewUrl: '#' }) :
//     null,
//   currentMovie: Immutable.fromJS({
//     title: text('title', 'The Current Movie'),
//     overview: text('overview', 'This is the the current movie\'s summary. A little bit of info about the plot and the characters may be found here.'),
//     poster_path: text('posterImgSrc', '') || null,
//     backdrop_path: text('backdropImgSrc', '') || null,
//     vote_count: number('voteCount', 345),
//     vote_average: number('voteAverage', 6, {
//       range: true,
//       min: 0.1,
//       max: 10,
//       step: 0.1
//     }),
//     popularity: number('popularity', 1.3453),
//     genre_ids: getGenresIds(),
//     release_date: text('releaseDate', '1989-07-07')
//   })
// });

// storiesOf('CurrentMovie', module)
//   .addDecorator(withKnobs)
//   .add('view', () => (
//     <Story
//       title="CurrentMovie"
//       summary="View which displays the Movie component plus actions"
//       displayInfo={boolean('displayInfo', false)}
//     >
//       <CurrentMovie {...getProps()} />
//     </Story>
//   ));
