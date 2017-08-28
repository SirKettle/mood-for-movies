import React from 'react';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';
import { Connected as Search } from '../../containers/Search/Search';

function SearchView() {
  return (<Search />);
}

export default connect(() => routeNodeSelector(''))(SearchView);
