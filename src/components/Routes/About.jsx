import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';
import { Connected as Header } from '../../containers/Header/Header';
import styles from './About.css';
import typography from '../../css/typography.css';
import logo from '../../assets/images/choosymovie/choosy-movie-logo-grey.png';
import tmdb from '../../assets/images/tmdb/powered-by-rectangle-blue.svg';

function About() {
  return (
    <div className={styles.page}>
      <Header
        className={styles.header}
        includeLinks={['search', 'about']}
      />
      <div className={styles.contents}>
        <h3 className={classnames(typography.margins, typography.will)}>Choosy Movie?</h3>
        <p className={classnames(typography.bottomMargin, typography.harrison)}>
          At your service! Helps you choose a movie to watch based
          on what you‘re in the mood for...
        </p>
        <img
          className={classnames(styles.logo)}
          src={logo}
          alt="Choosy Movie"
        />
        <h3 className={classnames(typography.margins, typography.will)}>How?</h3>
        <p className={classnames(typography.bottomMargin, typography.harrison)}>
          Simple. Select what you are in the mood for and hit the button.
          We hope you like the movie suggestions!
        </p>
        <h3 className={classnames(typography.margins, typography.will)}>Why?</h3>
        <p className={classnames(typography.bottomMargin, typography.harrison)}>
          Mainly for a bit of fun, but also because I found it hard to find a film to watch on
          Netflix and Amazon based on how I was feeling
        </p>
        <h3 className={classnames(typography.margins, typography.will)}>Who?</h3>
        <p className={classnames(typography.bottomMargin, typography.harrison)}>
          My name is Will Thirkettle - I‘m a developer - you can find me
          here: <a title="Will Thirkettle - Software Engineer" href="http://willthirkettle.co.uk/">http://willthirkettle.co.uk/</a>.
        </p>
        <h3 className={classnames(typography.margins, typography.will)}>Who else?</h3>
        <p className={classnames(typography.bottomMargin, typography.harrison)}>
          The data used in this app (Choosy Movie) is primarily sourced from the
          excellent <a title="The Movie DB" href="https://www.themoviedb.org/">TMDb APIs</a>.
        </p>
        <img
          className={classnames(styles.logo)}
          src={tmdb}
          alt="Powered by TMDb"
        />
        <p className={classnames(typography.bottomMargin, typography.elliot, styles.imageSummary)}>
          This product uses the TMDb API but is not endorsed or certified by TMDb.
        </p>
        <h3 className={classnames(typography.margins, typography.will)}>Forgotten anyone?</h3>
        <p className={classnames(typography.bottomMargin, typography.harrison)}>
          This app also uses Netflix Roulette API and iTunes Search API
          to access availability of the movie results on the two platforms.
        </p>
        <h3 className={classnames(typography.margins, typography.will)}>Ahem...</h3>
        <p className={classnames(typography.bottomMargin, typography.harrison)}>
          Special thanks to my beautiful wife Vicky, and my two lovely boys Harrison and Elliot.
        </p>
      </div>
    </div>
  );
}

export default connect(() => routeNodeSelector(''))(About);
