import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';
import styles from './About.css';
import typography from '../css/typography.css';
import logo from '../assets/images/emotionpictures/emotion-pictures-white-500.png';
import tmdb from '../assets/images/tmdb/powered-by-rectangle-blue.svg';

function About() {
  return (
    <div className={styles.contents}>
      <img
        className={classnames(typography.bottomMargin, styles.logo)}
        src={logo}
        alt="Emotion Pictures"
      />
      <img
        src={tmdb}
        alt="Powered by TMDb"
      />
    </div>
  );
}

export default connect(() => routeNodeSelector('about'))(About);
