import React from 'react';
import classnames from 'classnames';
import '../css/reset.css';
import typography from '../css/typography.css';
import styles from './story.css';

const Story = ({
  title,
  summary,
  children,
  className
}) => {
  return (
    <div className={classnames(styles.story, className)}>
      <div className={styles.info}>
        {title && <h1 className={typography.phil}>{title}</h1>}
        {summary && <p className={typography.harrison}>{summary}</p>}
      </div>
      <div className={styles.contents}>
        {children}
      </div>
    </div>
  );
};

Story.propTypes = {
  className: React.PropTypes.string,
  title: React.PropTypes.string,
  summary: React.PropTypes.string,
  children: React.PropTypes.node.isRequired
};

Story.defaultProps = {
  className: 'some-story',
  title: null,
  summary: null
};

export default Story;
