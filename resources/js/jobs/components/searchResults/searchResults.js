import React from 'react';

import './SearchResults.css';

import { connect } from 'react-redux';

import Result from './result/result';

class SearchResults extends React.Component
{
  constructor (props)
  {
    super(props);
    this.state = {
           
    };
  }

  componentDidMount ()
  {
    this.props.connect('SearchResults');
  }

  render ()
  {
    let searchedJobs = null;
    if (this.props.searchResults) 
    {
        searchedJobs = Object.entries(this.props.searchResults).map(result => {
            const project = {...result[1]};
            return (
                <div className="searchedJobCard" key={project['id']}>
                    <div className="searchedJobCard-item">
                        {project['name']}
                    </div>
                </div>
            );
        })
    }

    return (
      <React.Fragment>
        <div className="searchedJobCard">
            <div className="searchedJobCard-item">
                {searchedJobs}
            </div>
        </div>    
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