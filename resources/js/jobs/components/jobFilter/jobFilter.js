import React from 'react';

import './JobFilter.css';

import { connect } from 'react-redux';

class JobFilter extends React.Component
{
  constructor (props)
  {
    super(props);
    this.state = {
           
    };
  }

  componentDidMount ()
  {
    this.props.connect('JobFilter');
  }

  render ()
  {
    let recentSearches = null;
    if (this.props.recentSearches)
    {
      recentSearches = this.props.recentSearches.map(search => {
        if (search === '') return;
        return <p key={search}>{search}</p>
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
  }
}


export default connect(mapStoreToProps, mapDispatchToProps) (JobFilter);