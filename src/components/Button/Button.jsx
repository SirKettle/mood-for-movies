import React, { PropTypes } from 'react';
import BaseButton from './BaseButton';

const Button = ({
  className,
  dataRole,
  onClick,
  children
}) => {
  return (
    <BaseButton
      className={className}
      dataRole={dataRole}
      onClick={onClick}
    >{children}</BaseButton>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  dataRole: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.children.isRequired
};

Button.defaultProps = {
  className: 'some-button',
  dataRole: 'button',
  onClick: () => {}
};

export default Button;
