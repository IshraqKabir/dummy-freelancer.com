import React from 'react';
import './skills.css';

const axios = require('axios');

class Skills extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            searchResults: [],
            selectedSkills: [],
            showSkillsSearchResults: false
        }
        

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleSearchResultSkillClicked = this.handleSearchResultSkillClicked.bind(this);
        this.handleSelectedSkillCloseClicked = this.handleSelectedSkillCloseClicked.bind(this);
    }

    async handleChange (event) {       
        this.setState({value: event.target.value});
        this.setState({showSkillsSearchResults: true});

        let searchResults = [];
        await axios.get(`http://localhost:8000/skills?q=${this.state.value}`)
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
        }.bind(this), 100);
    }

    handleSearchResultSkillClicked (id, name)
    {
        let joined = [...this.state.selectedSkills];
        joined.push([id, name]);
        this.setState({selectedSkills: joined})
    }

    handleSelectedSkillCloseClicked (id) {
        console.log(id)
        let joined = [...this.state.selectedSkills];

        for (let i = 0; i < joined.length; i++) 
        {
            if (joined[i][0] === id) {
                joined.splice(i, 1);
                break;
            }
        }
        
        this.setState({selectedSkills: joined});
    }

    render() {
        let results = null;
        if (this.state.searchResults && this.state.value !== '') 
        {
            results = this.state.searchResults.map(result => {
                for (let i = 0; i < this.state.selectedSkills.length; i++) {
                    if (this.state.selectedSkills[i][0] === result[0]) return;
                }
                return <div 
                            key={result[0]} 
                            result_id={result[0]}
                            onClick={this.handleSearchResultSkillClicked.bind(this, result[0], result[1])}
                        >{result[1]}</div>
            })
        }

        let selectedSkills = null;
        let selectedSkillsOptions = null;
        if (this.state.selectedSkills)
        {
            selectedSkills = this.state.selectedSkills.map(skill => {
                
                return <span 
                            key={skill[0]} 
                            value={skill[0]}
                            className="SelectedSkill"
                        >{skill[1]} <span onClick={this.handleSelectedSkillCloseClicked.bind(this, skill[0])} className="SelectedSkillClose">x</span></span>
            });
            selectedSkillsOptions = this.state.selectedSkills.map(skill => {
                
                return <option 
                            key={skill[0]} 
                            value={skill[0]}
                            className="SelectedSkill"
                            selected
                            hidden
                        >{skill[1]}</option>
            });
        }


        return (
           <React.Fragment>
                <h3>What skills are required?</h3>
                <p> We've detected the following skills to suit your project. Feel free to modify these choices to best suit your needs.</p>
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

export default Skills;