import React from 'react';

import './JobFilter.css';

import { connect } from 'react-redux';

const axios = require('axios');

class JobFilter extends React.Component
{
  constructor (props)
  {
    super(props);
    this.state = {
           
    };
    this.handleRecentSearchClicked = this.handleRecentSearchClicked.bind(this);
  }

  componentDidMount ()
  {
    this.props.connect('JobFilter');
  }

  handleRecentSearchClicked (search)
  {
    this.props.handleRecentSearchClicked(search);
    this.props.setRecentSearches(search);

    axios.get(`http://localhost:8000/jobsapi?q=${search}`)
      .then(response => {
        this.props.setSearchResults(response.data); 
    })
  }

  render ()
  {
    let recentSearches = null;
    if (this.props.recentSearches)
    {
      recentSearches = this.props.recentSearches.map(search => {
        if (search === '') return;
        return <div 
                key={search}
                className="recentSearch"
                onClick={() => this.handleRecentSearchClicked(search)}
              >{search}</div>
      })
    }
    return (
      <div className="jobFilterContainer">
        <h5 className="recentSearchesHeading">
          My Recent Searches
        </h5>
        <div className="recentSearches">
          {recentSearches}
        </div>
      </div>
    );
  }
}

function mapStoreToProps (store)
{
  return {
    recentSearches: store.recentSearches
  }
}

function mapDispatchToProps (dispatch)
{
  return {
    connect: (componentName) => dispatch({type:'connected', componentName}),
    handleRecentSearchClicked: (search) => dispatch({type: 'HANDLE_RECENT_SEARCH_CLICKED', search}),
    setRecentSearches: (name) => dispatch({type: 'SET_RECENT_SEARCHES', name}),
    setSearchResults: (searchResults) => dispatch({type: 'SET_SEARCH_RESULTS', searchResults}),
  }
}


export default connect(mapStoreToProps, mapDispatchToProps) (JobFilter);