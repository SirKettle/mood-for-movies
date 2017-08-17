import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Header.css';
import logo from '../../assets/images/choosymovie/choosy-movie-102-100-white.png';
import typography from '../../css/typography.css';
import Button from '../Button/BaseButton';

const getKey = () => `k_${Math.random()}`;

const renderMenuItems = (items) => {
  if (!items || !items.length) {
    return null;
  }

  return (
    <div className={styles.menu}>
      {
        items.map(item => (
          <Button
            key={getKey()}
            className={classnames(typography.harrison, styles.item, item.className)}
            dataRole={item.dataRole || `header-item-${item.label.replace(/ /g, '')}`}
            onClick={item.onClick}
          >{item.label}</Button>
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
          alt="Choosy Movie"
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
