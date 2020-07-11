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
        searchedJobs = Object.entries(this.props.searchResults).map(result => {
            const project = {...result[1]};
            let skills = project['skills'].map(skill => {
                return (
                    <a
                        className="skill"
                        href="#"
                        key={skill.pivot['skill_id']}
                    >{skill['name']}</a>
                );
            })
            return (
                <div 
                    className="searchedJobCard" 
                    key={project['id']}
                    
                >
                    <div className="searchedJobCard-item">
                        <div className="jobContainer">
                            <a className="projectName bold" href={`/project/${project['id']}`}>
                                {project['name']}
                            </a>
                            <div className="projectDetails">
                                {project['details']}
                            </div>
                            <div className="skills">
                                {skills}
                            </div>
                        </div>
                        <div className="budgetContainer">
                          <div className="budget">
                            {project['min_budget']} - {project['max_budget']} {project['currency_type']}
                            {project['project_type'] === 'hourly' ? ' / hour' : null}
                          </div>
                        </div>
                    </div>
                </div>
            );
        })
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
      searchResults: store.searchResults
  }
}

function mapDispatchToProps (dispatch)
{
  return {
    connect: (componentName) => dispatch({type:'connected', componentName}),
  }
}


export default connect(mapStoreToProps, mapDispatchToProps) (SearchResults);