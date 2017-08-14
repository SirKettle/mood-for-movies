import React from 'react';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';
import { Connected as Results } from '../../containers/Results/Results';

function ResultsView() {
  return (<Results />);
}

export default connect(() => routeNodeSelector('results'))(ResultsView);
