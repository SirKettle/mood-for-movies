import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Header.css';
import logo from '../../assets/images/emotionpictures/emotion-pictures-white-500.png';
import typography from '../../css/typography.css';

const getKey = () => `k_${Math.random()}`;

const renderMenuItems = (items) => {
  if (!items || !items.length) {
    return null;
  }

  return (
    <div className={styles.menu}>
      {
        items.map(item => (
          <button
            key={getKey()}
            className={classnames(typography.phil, styles.item, item.className)}
            data-role={item.dataRole}
            onClick={item.onClick}
          >{item.label}</button>
        ))
      }
    </div>
  );
};

const Header = ({
  className,
  children,
  menuItems
}) => {
  return (
    <div className={classnames(className, styles.header)}>
      <a
        className={classnames(styles.logoLink)}
        href={'/#/'}
      >
        <img
          className={classnames(styles.logo)}
          src={logo}
          alt="Emotion Pictures"
        />
      </a>
      { children }
      { renderMenuItems(menuItems) }
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  menuItems: PropTypes.arrayOf(PropTypes.object)
};

Header.defaultProps = {
  className: 'header',
  children: null,
  menuItems: null
};

export default Header;
