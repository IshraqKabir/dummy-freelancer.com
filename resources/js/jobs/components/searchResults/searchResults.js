import React from 'react';

import './SearchResults.css';

import { connect } from 'react-redux';

class SearchResults extends React.Component
{
  constructor (props)
  {
    super(props);
    this.state = {
           
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount ()
  {
    this.props.connect('SearchResults');
  }

  handleClick (id)
  {
      
  }

  render ()
  {
    let searchedJobs = null;
    if (this.props.searchResults) 
    {
      searchedJobs = this.props.searchResults.map(result => {
        let skills = null;
        skills = result['skills'].map(skill => {
          return (
              <a
                  className="skill"
                  href="#"
                  key={skill.pivot['skill_id']}
              >{skill['name']}</a>
          );
        });
        return (
          <div 
              className="searchedJobCard" 
              key={result['id']}
              
          >
              <div className="searchedJobCard-item">
                  <div className="jobContainer">
                      <a className="projectName bold" href={`/project/${result['id']}`}>
                          {result['name']}
                      </a>
                      <div className="projectDetails">
                          {result['details']}
                      </div>
                      <div className="skills">
                          {skills}
                      </div>
                  </div>
                  <div className="budgetContainer">
                    <div className="budget">
                      {result['min_budget']} - {result['max_budget']} {result['currency_type']}
                      {result['project_type'] === 'hourly' ? ' / hour' : null}
                    </div>
                  </div>
              </div>
          </div>
        );
      });
    }

    return (
      <React.Fragment>
        {searchedJobs}
      </React.Fragment>
    );
  }
}

function mapStoreToProps (store)
{
  return {
      searchResults: store.searchResults,
      recentSearches: store.recentSearches,
      filters: store.filters
  }
}

function mapDispatchToProps (dispatch)
{
  return {
    connect: (componentName) => dispatch({type:'connected', componentName}),
  }
}


export default connect(mapStoreToProps, mapDispatchToProps) (SearchResults);