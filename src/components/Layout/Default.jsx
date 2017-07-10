import React from 'react';
import styles from './Default.css';
// import Navigation from '../Navigation';

export default function App({ children }) {
  return (
    <div className={styles.root}>
      <header>
        <h1>Mood for a movie</h1>
        <nav>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}

App.propTypes = {
  children: React.propTypes.node.isRequired
};
