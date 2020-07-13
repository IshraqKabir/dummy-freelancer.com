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
    this.handleShowFixedChange = this.handleShowFixedChange.bind(this);
    this.handleShowHourlyChange = this.handleShowHourlyChange.bind(this);
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
        this.props.handleFilterChange(); 
    })
  }

  handleShowFixedChange () 
  {
    this.props.handleShowFixedChange();
    this.props.handleFilterChange();
  }
  
  handleShowHourlyChange () 
  {
    this.props.handleShowHourlyChange();
    this.props.handleFilterChange();
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
      <React.Fragment>
        <div className="jobFilterContainer">
          <h5 className="recentSearchesHeading">
            My Recent Searches
          </h5>
          <div className="recentSearches">
            {recentSearches}
          </div>
        </div>
        <div className="typeFilterSection">
          <h5 className="typeFilterSection-mainheading">
            Filter By:
          </h5>
          <label className="b-contain">
            <span>Fixed Price</span>
            <input 
              type="checkbox"
              defaultChecked={true} 
              onChange={this.handleShowFixedChange}
            />
            <div className="b-input"></div>
          </label>
          <label className="b-contain">
            <span>Hourly Projects</span>
            <input 
              type="checkbox"
              defaultChecked={true} 
              onChange={this.handleShowHourlyChange}
            />
            <div className="b-input"></div>
          </label>
          

        </div>
      </React.Fragment>
    );
  }
}

function mapStoreToProps (store)
{
  return {
    recentSearches: store.recentSearches,
  }
}

function mapDispatchToProps (dispatch)
{
  return {
    connect: (componentName) => dispatch({type:'connected', componentName}),
    handleRecentSearchClicked: (search) => dispatch({type: 'HANDLE_RECENT_SEARCH_CLICKED', search}),
    setRecentSearches: (name) => dispatch({type: 'SET_RECENT_SEARCHES', name}),
    setSearchResults: (searchResults) => dispatch({type: 'SET_SEARCH_RESULTS', searchResults}),
    handleShowFixedChange: () => dispatch({type: 'HANDLE_SHOW_FIXED_CHANGE'}),
    handleShowHourlyChange: () => dispatch({type: 'HANDLE_SHOW_HOURLY_CHANGE'}),
    handleFilterChange: () => dispatch({type: 'HANDLE_FILTER_CHANGE'}),
  }
}


export default connect(mapStoreToProps, mapDispatchToProps) (JobFilter);