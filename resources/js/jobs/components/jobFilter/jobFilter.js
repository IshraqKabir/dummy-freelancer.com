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
      enterSkills: '',
      skillsSuggestions: [],
      showSkillsSuggestions: false,
      
    };
    this.handleRecentSearchClicked = this.handleRecentSearchClicked.bind(this);
    this.handleShowFixedChange = this.handleShowFixedChange.bind(this);
    this.handleShowHourlyChange = this.handleShowHourlyChange.bind(this);
    this.handleSkillFilterChange = this.handleSkillFilterChange.bind(this);
    this.handleEnterSkillsChange = this.handleEnterSkillsChange.bind(this);
    this.handleSkillsSuggesionClick = this.handleSkillsSuggesionClick.bind(this);
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
        this.props.handleSkillFilterState();
    })
  }

  handleShowFixedChange () 
  {
    this.props.handleShowFixedChange();
    this.props.handleFilterChange();
    this.props.handleSkillFilterState();
  }
  
  handleShowHourlyChange () 
  {
    this.props.handleShowHourlyChange();
    this.props.handleFilterChange();
    this.props.handleSkillFilterState();
  }

  handleSkillFilterChange (skill)
  {
    this.props.handleSkillFilterChange(skill);
    this.props.handleSkillFilterState();
  }

  async handleEnterSkillsChange (event)
  {
    this.setState({enterSkills: event.target.value})
    this.setState({showSkillsSuggestions: true});

    if (event.target.value === '')
    {
      this.setState({showSkillsSuggestions: false});
    }

    let skillsSuggestions = [];

    await axios.get(`http://localhost:8000/skills?q=${event.target.value}`)
    .then(response => {
      console.log(response.data);
        response.data.map(data => {
                skillsSuggestions.push(data.name);
        });
    })
    .catch(err => console.log(err));

    this.setState({skillsSuggestions: skillsSuggestions});
  }

  handleSkillsSuggesionClick (suggestion)
  {
    this.props.handleSkillsSuggesionClick(suggestion);
    this.props.handleFilterChange(suggestion);
    this.props.handleSkillFilterState();

    this.setState({showSkillsSuggestions: false});
    this.setState({enterSkills: ''});
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

    let skills = null;

    if (this.props.skills) 
    {
      skills = Object.keys(this.props.skills).map(skill => {
        return (
          <label className="b-contain" key={skill}>
            <span>{skill}</span>
            <input 
              type="checkbox"
              defaultChecked={this.props.skills[skill]} 
              onChange={() => this.handleSkillFilterChange(skill)}
            />
            <div className="b-input"></div>
          </label>
        );
      });
    }

    let skillsSuggestions = null;
    if (this.state.skillsSuggestions)
    {
      skillsSuggestions = this.state.skillsSuggestions.map(suggestion => {
        if (Object.keys(this.props.skills).includes(suggestion))
        {
          return;
        }
        return (
          <div 
            className="skillsSuggestion"
            key={suggestion}
            onClick={() => this.handleSkillsSuggesionClick(suggestion)}
          >
            {suggestion}
          </div>
        )
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
        <div className="skillFilterSection">
          <h5 className="skillFilterSection-heading">
            Skills
          </h5>
          {skills}
        </div>
        <input 
          type="text"
          className="enterSkills"
          placeholder="Or enter skills"
          value={this.state.enterSkills}
          onChange={this.handleEnterSkillsChange}
        />
        <div className="skillsSuggestions box-shadow">
          {this.state.showSkillsSuggestions ? skillsSuggestions : null}
        </div>
      </React.Fragment>
    );
  }
}

function mapStoreToProps (store)
{
  return {
    recentSearches: store.recentSearches,
    skills: store.filters.skills,

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
    handleSkillFilterChange: (skill) => dispatch({type: 'HANDLE_SKILL_FILTER_CHANGE', skill}),
    handleSkillFilterState: () => dispatch({type: 'HANDLE_SKILL_FILTER_STATE'}),
    handleSkillsSuggesionClick: (suggestion) => dispatch({type: 'HANDLE_SKILLS_SUGGESTION_CLICK', suggestion}),

  }
}


export default connect(mapStoreToProps, mapDispatchToProps) (JobFilter);