import React from 'react';
import './skills.css';

const axios = require('axios');

import { connect } from 'react-redux';

import {url} from '../../../url';

class Skills extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            searchResults: [],
            // selectedSkills: [],
            showSkillsSearchResults: false,
            error: null
        }
        

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleSearchResultSkillClicked = this.handleSearchResultSkillClicked.bind(this);
        this.handleSelectedSkillCloseClicked = this.handleSelectedSkillCloseClicked.bind(this);
    }

    componentDidMount ()
{
        this.props.connect('skills.js');
    }

    async handleChange (event) {       
        this.setState({value: event.target.value});
        this.setState({showSkillsSearchResults: true});
        this.setState({error: null});

        let searchResults = [];
        await axios.get(`${url}/skills?q=${event.target.value}`)
            .then(response => {
                response.data.map(data => {
                        searchResults.push([data.id, data.name]);
                });
            })
            .catch(err => console.log(err));
        
        this.setState({searchResults: searchResults});
    }

    handleBlur () 
    {           
        // setTimeout may seem redundant here
        // but it is here to prevent the searchsuggestions closing too early
        // which will cause in the searchsuggestions onclick not working
        // because the searchsuggestions will be immediately closed if the settimeout is not implemented
        // as soon as handleBlur activates
        setTimeout(function() {
            this.setState({value: ''});
            this.setState({showSkillsSearchResults: false});

            // error checking
            if (this.props.selectedSkills.length === 0) 
            {
                this.setState({error: 'Please enter atleast 1 skill'});
            }
            else if (this.props.selectedSkills.length > 3)
            {
                this.setState({error: 'Please enter atmost 3 skills'});
            }
            else {
                this.setState({error: null});
            }
        }.bind(this), 100);        
    }

    handleSearchResultSkillClicked (id, name)
    {   
        let joined = [...this.props.selectedSkills];
        joined.push([id, name]);
        // this.setState({selectedSkills: joined});
        this.props.setSelectedSkills(joined);


        // error checking
        if (joined.length === 0) 
        {
            this.setState({error: 'Please enter atleast 1 skill'});
        }
        else if (joined.length > 3)
        {
            this.setState({error: 'Please enter atmost 3 skills'});
        }
        else {
            this.setState({error: null});
        }
        this.props.handleNextButton();
    }

    handleSelectedSkillCloseClicked (id) {
        let joined = [...this.props.selectedSkills];

        for (let i = 0; i < joined.length; i++) 
        {
            if (joined[i][0] === id) {
                joined.splice(i, 1);
                break;
            }
        }
        
        this.props.setSelectedSkills(joined);


        // error checking
        if (joined.length === 0) 
        {
            this.setState({error: 'Please enter atleast 1 skill'});
        }
        else if (joined.length > 3)
        {
            this.setState({error: 'Please enter atmost 3 skills'});
        }
        else {
            this.setState({error: null});
        }
        this.props.handleNextButton();
    }


    render() {
        let results = null;
        if (this.state.searchResults && this.state.value !== '') 
        {
            results = this.state.searchResults.map(result => {
                for (let i = 0; i < this.props.selectedSkills.length; i++) {
                    if (this.props.selectedSkills[i][0] === result[0]) return;
                }
                return <span 
                            key={result[0]} 
                            result_id={result[0]}
                            className="SearchResult"
                            onClick={this.handleSearchResultSkillClicked.bind(this, result[0], result[1])}
                        >{result[1]}</span>
            })
        }

        let selectedSkills = null;
        let selectedSkillsOptions = null;
        if (this.props.selectedSkills)
        {
            selectedSkills = this.props.selectedSkills.map(skill => {
                
                return <span 
                            key={skill[0]} 
                            value={skill[0]}
                            className="SelectedSkill"
                        >
                            {skill[1]} <span onClick={this.handleSelectedSkillCloseClicked.bind(this, skill[0])} className="SelectedSkillClose">x</span>
                        </span>
            });
            selectedSkillsOptions = this.props.selectedSkills.map(skill => {
                
                return <option 
                            key={skill[0]} 
                            value={skill[0]}
                            selected
                            hidden
                        >{skill[1]}</option>
            });
        }


        return (
           <React.Fragment>
                <h3>What skills are required?</h3>
                <p> We've detected the following skills to suit your project. Feel free to modify these choices to best suit your needs.</p>
                    
                    { this.state.error ? 
                            <span className="error">{this.state.error}</span>
                        : null}
                <div className="SkillsContainer">
                    <div className="SelectedSkills">
                        {selectedSkills}
                        <select name="skills[]" multiple hidden>
                            {selectedSkillsOptions}
                        </select>
                    </div>
                    <input 
                        type="text" 
                        className="SkillsSearchField" 
                        placeholder="Enter skills here..."
                        value={this.state.value}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                    />
                </div>
                { this.state.showSkillsSearchResults ?
                    <div className="SkillsSearchResults">
                        {results}
                    </div>
                : null }
           </React.Fragment>
        )
    }
}

function mapStoreToProps (store)
{
    return {
        selectedSkills: store.skills.selectedSkills
    }
}

function mapDispatchToProps (dispatch)
{
  return {
    connect: (componentName) => dispatch({type:'connected', componentName}),
    setSelectedSkills: (value) => dispatch({type: 'SET_SELECTED_SKILLS', value}),
    handleNextButton: () => dispatch({type: 'SET_NEXT_BUTTON_STATE'})
  }
}


export default connect(mapStoreToProps, mapDispatchToProps) (Skills);

