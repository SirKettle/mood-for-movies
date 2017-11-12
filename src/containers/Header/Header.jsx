import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { actions as routerActions } from 'redux-router5';
// import { trackClick } from '../../domains/ui/uiActions';
import styles from './Header.css';
import ImageButton from '../../components/ImageButton/ImageButton';
import logo from '../../assets/images/choosymovie/choosy-movie-102-100-white.png';
import searchImage from '../../assets/images/svg/search.svg';
import settingsImage from '../../assets/images/svg/settings.svg';
import aboutImage from '../../assets/images/svg/about.svg';
import backImage from '../../assets/images/svg/back.svg';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  // track: (key, data) => { trackClick(dispatch, key, data); },
  navigateTo: (name, params) => dispatch(routerActions.navigateTo(name, params))
});

const getKey = () => `k_${Math.random()}`;

const headerLinks = [
  { name: '__root__', alt: 'Choosy Movie - home', src: logo, className: styles.logoButton, imageClassName: styles.logo, default: true },
  { name: 'back', alt: 'Go back', src: backImage, className: styles.back, default: false },
  { name: 'search', alt: 'Search Choosy Movie', src: searchImage, className: styles.search, default: false },
  { name: 'settings', alt: 'Choosy Movie settings', src: settingsImage, className: styles.settings, default: false },
  { name: 'about', alt: 'About Choosy Movie', src: aboutImage, className: styles.about, default: false }
];

export const Header = ({
  className,
  children,
  navigateTo,
  // track,
  includeLinks,
  customItems
}) => {
  return (
    <div className={classnames(className, styles.header)}>
      {
        headerLinks
          .filter(headerLink =>
            headerLink.default ||
            includeLinks.indexOf(headerLink.name) !== -1
          )
          .map((headerLink) => {
            return (
              <ImageButton
                key={headerLink.name}
                onClick={() => {
                  if (headerLink.name === 'back') {
                    history.back();
                    return;
                  }
                  navigateTo(headerLink.name);
                }}
                className={classnames(styles.imageButton, headerLink.className)}
                imageClassName={headerLink.imageClassName || styles.imageButtonImage}
                imageSrc={headerLink.src}
                imageAlt={headerLink.alt}
              />
            );
          })
      }
      {
        customItems
          .map((item) => {
            return (
              <ImageButton
                key={getKey()}
                onClick={item.onClick}
                className={classnames(styles.imageButton, item.className)}
                imageClassName={classnames(styles.imageButtonImage, item.imageClassName)}
                imageSrc={item.src}
                imageAlt={item.alt}
              />
            );
          })
      }
      { children }
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  navigateTo: PropTypes.func,
  // track: PropTypes.func,
  customItems: PropTypes.arrayOf(PropTypes.object),
  includeLinks: PropTypes.arrayOf(PropTypes.string)
};

Header.defaultProps = {
  className: 'header',
  children: null,
  navigateTo: () => {},
  // track: () => {},
  customItems: [],
  includeLinks: []
};

export const Connected = connect(mapStateToProps, mapDispatchToProps)(Header);
