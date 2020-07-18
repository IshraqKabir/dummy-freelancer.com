  import React from 'react';

import './Search.css';

import searchIcon from './search.svg';

const axios = require('axios');

import { connect } from 'react-redux';

import {url} from '../../../url';


class Search extends React.Component
{
  constructor (props)
  {
    super(props);
    this.state = {
           
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount ()
  {
    this.props.connect('Search');
    this.props.setRecentSearchesFromCookies();
  }

  handleSearch ()
  {
    console.log('handlesearch');
    this.props.setRecentSearches(this.props.name);
    axios.get(`${url}/jobsapi?q=${this.props.name}`)
      .then(response => {
        this.props.setSearchResults(response.data);
        this.props.handleFilterChange();
        this.props.handleSkillFilterState();
        this.props.paginate();
    })

    
  }

  handleChange (e)
  {
    this.props.setName(e.target.value);
  }

  render ()
  {
    return (
      <React.Fragment>
          <div className="box">
            <div className="searchContainer box-shadow">
              <div className="searchField">
                <img src={searchIcon} className="searchIcon"/>
                <input 
                  type="text" 
                  name="name" 
                  value={this.props.name}
                  onChange={(e) => this.handleChange(e)}
                  className="inputField" 
                  placeholder="Search Keyword"
                />
              </div>
                
              <div 
                className="searchButton bold"
                onClick={this.handleSearch}
              >
                Search
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
    name: store.name
  }
}

function mapDispatchToProps (dispatch)
{
  return {
    connect: (componentName) => dispatch({type:'connected', componentName}),
    setName: (name) => dispatch({type: 'SET_NAME', name}),
    setSearchResults: (searchResults) => dispatch({type: 'SET_SEARCH_RESULTS', searchResults}),
    setRecentSearches: (name) => dispatch({type: 'SET_RECENT_SEARCHES', name}),
    setRecentSearchesFromCookies: () => dispatch({type: 'SET_RECENT_SEARCHES_FROM_COOKIES'}),
    handleFilterChange: () => dispatch({type: 'HANDLE_FILTER_CHANGE'}),
    handleSkillFilterState: () => dispatch({type: 'HANDLE_SKILL_FILTER_STATE'}),
    paginate: () => dispatch({type: 'PAGINATE', pageNumber: 1}),

  }
}


export default connect(mapStoreToProps, mapDispatchToProps) (Search);