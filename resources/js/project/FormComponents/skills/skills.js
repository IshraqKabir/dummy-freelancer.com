import React from 'react';
import './skills.css';

const axios = require('axios');

class Skills extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            searchResults: [],
            selectedSkills: []
        }
        

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleSearchResultSkillClicked = this.handleSearchResultSkillClicked.bind(this);
    }

    async handleChange (event) {       
        this.setState({value: event.target.value});

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
            this.setState({value: ''})
        }.bind(this), 100);
    }

    handleSearchResultSkillClicked (id)
    {
        console.log(id)
    }

    render() {
        let results = null;

        if (this.state.searchResults && this.state.value !== '') 
        {
            results = this.state.searchResults.map(result => {
                
                return <div 
                            key={result[0]} 
                            result_id={result[0]}
                            onClick={this.handleSearchResultSkillClicked.bind(this, result[0])}
                        >{result[1]}</div>
            })
        }
        return (
           <React.Fragment>
                <h3>What skills are required?</h3>
                <p> We've detected the following skills to suit your project. Feel free to modify these choices to best suit your needs.</p>
                <div className="SkillsContainer">
                    <div className="SelectedSkills"></div>
                    <input 
                        type="text" 
                        className="SkillsSearchField" 
                        placeholder="Enter skills here..."
                        value={this.state.value}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                    />
                </div>
                <div className="SkillsSearchResults">
                    {results}
                </div>
           </React.Fragment>
        )
    }
}

export default Skills;