import React from 'react';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';
import { Connected as Settings } from '../../containers/Settings/Settings';

function SettingsView() {
  return (<Settings />);
}

export default connect(() => routeNodeSelector(''))(SettingsView);
