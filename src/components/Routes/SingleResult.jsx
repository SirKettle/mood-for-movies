import React from 'react';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';
import { Connected as SingleResult } from '../../containers/SingleResult/SingleResult';

function SingleResultView() {
  return (<SingleResult />);
}

export default connect(() => routeNodeSelector(''))(SingleResultView);
