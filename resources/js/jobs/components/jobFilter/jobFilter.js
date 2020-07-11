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
    return (
      <div className="jobFilterContainer">
        <h5 className="recentSearchesHeading">
          My Recent Searches
        </h5>
      </div>
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
  }
}


export default connect(mapStoreToProps, mapDispatchToProps) (JobFilter);