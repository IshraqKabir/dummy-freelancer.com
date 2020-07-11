import React from 'react';

import './jobs.css';

const axios = require('axios');

import { connect } from 'react-redux';

import Search from './components/search/search';
import SearchResults from './components/searchResults/searchResults';
import JobFilter from './components/jobFilter/jobFilter';

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
    axios.get(`http://localhost:8000/jobsapi?q=`)
      .then(response => {
        this.props.setSearchResults(response.data);
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
            <div className="jobFilter box-shadow">
              <JobFilter />
            </div>
            <div className="searchResults box-shadow">
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

  }
}

function mapDispatchToProps (dispatch)
{
  return {
    connect: (componentName) => dispatch({type:'connected', componentName}),
    setSearchResults: (searchResults) => dispatch({type: 'SET_SEARCH_RESULTS', searchResults}),
  }
}


export default connect(mapStoreToProps, mapDispatchToProps) (Jobs);