import React, { PropTypes } from 'react';

const BaseButton = ({
  className,
  dataRole,
  onClick,
  children
}) => {
  const handleClick = () => {
    console.log('TODO: track a click here', dataRole);
    return onClick(arguments);
  };

  return (
    <button
      className={className}
      data-role={dataRole}
      onClick={handleClick}
    >{children}</button>
  );
};

BaseButton.propTypes = {
  className: PropTypes.string,
  dataRole: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.children.isRequired
};

BaseButton.defaultProps = {
  className: 'some-movie',
  dataRole: 'button',
  onClick: () => {}
};

export default BaseButton;
