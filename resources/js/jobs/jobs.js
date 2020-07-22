import React from 'react';

import './jobs.css';

const axios = require('axios');

import { connect } from 'react-redux';

import Search from './components/search/search';
import SearchResults from './components/searchResults/searchResults';
import JobFilter from './components/jobFilter/jobFilter';

import {url} from '../url';

class Jobs extends React.Component
{
  constructor (props)
  {
    super(props);
    this.state = {
           
    };
  }

  componentDidMount ()
  {
    this.props.connect('Jobs');
    axios.get(`${url}/jobsapi?q=`)
    .then(response => {
      this.props.setSearchResults(response.data);
      this.props.paginate();
    })
    .catch(err => console.log(err));
  }

  render ()
  {
    return (
      <React.Fragment>
        <div className="container">
          <Search />
          <div className="searchResultContainer">
            <div className={"jobFilter box-shadow" + (this.props.showJobFilter ? ' popped': '')}>
              <JobFilter />
            </div>
            <div className={"searchResults box-shadow"}>
              <SearchResults />
            </div>
          </div>          
        </div>
  
      </React.Fragment>
    );
  }
}

function mapStoreToProps (store)
{
  return {
    showJobFilter: store.showJobFilter
  }
}

function mapDispatchToProps (dispatch)
{
  return {
    connect: (componentName) => dispatch({type:'connected', componentName}),
    setSearchResults: (searchResults) => dispatch({type: 'SET_SEARCH_RESULTS', searchResults}),
    paginate: () => dispatch({type: 'PAGINATE', pageNumber: 1}),

  }
}


export default connect(mapStoreToProps, mapDispatchToProps) (Jobs);