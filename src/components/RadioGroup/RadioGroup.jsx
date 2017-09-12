import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './RadioGroup.css';
import typography from '../../css/typography.css';

const RadioGroup = ({ className, options, value, onSelected }) => {
  const getIsChecked = (key) => {
    return value === key;
  };

  return (
    <div className={classnames(className, styles.radioGroup)}>
      {
        options.map((option) => {
          const key = option.value;
          const name = `radio${key}`;
          return (
            <div className={styles.option} key={key}>
              <input
                className={styles.input}
                id={name}
                type="radio"
                onChange={(e) => { onSelected(e, key); }}
                checked={getIsChecked(key)}
              />
              <label className={classnames(styles.label)} htmlFor={name}>
                <h3 className={typography.harrison}>{ option.label }</h3>
              </label>
            </div>
          );
        })
      }
    </div>
  );
};

RadioGroup.propTypes = {
  className: PropTypes.string,
  /* eslint react/forbid-prop-types: 0 */
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.string,
  onSelected: PropTypes.func.isRequired
};

RadioGroup.defaultProps = {
  className: 'radio-options-group',
  value: undefined
};

export default RadioGroup;
