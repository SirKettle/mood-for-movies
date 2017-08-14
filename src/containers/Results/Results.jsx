import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as moodSelectors from '../../domains/mood/moodSelectors';

const mapStateToProps = (state) => {
  return {
    currentMoods: moodSelectors.currentMoodsSelector(state),
    currentMedia: moodSelectors.currentMediaSelector(state)
  };
};

const mapDispatchToProps = () => ({
});

export class Results extends Component {

  componentWillMount() {
    const { currentMoods, currentMedia } = this.props;
    
    console.log('currentMoods/currentMedia', currentMoods, currentMedia);
  }

  render() {
    return (
      <div>
        Results
      </div>
    );
  }
}

Results.propTypes = {
  currentMoods: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentMedia: PropTypes.string.isRequired
};

export const Connected = connect(mapStateToProps, mapDispatchToProps)(Results);
