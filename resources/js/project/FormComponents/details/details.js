import React from 'react';
import './details.css';

import { connect } from 'react-redux';

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            length: 0,
            error: false,
            emptyError: false
        }
        
        this.characterLimit = 4000;

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    componentDidMount () 
    {
        this.props.connect('details.js');
    }

    handleChange (event) {       
        if (event.target.value.length > 4000) {
            this.setState({error:true});
        } else {
            this.setState({error:false});
        }

        if (event.target.value.length !== 0)
        {
            this.setState({emptyError: false});
        }

        this.setState({value: event.target.value});
        this.setState({length: event.target.value.length});
    }

    handleBlur () 
    {
        if (this.state.length === 0)
        {
            this.setState({emptyError: true});
        }
    }

    render() {
        return (
            <React.Fragment>                
                <h3>Tell us more about your project</h3>
                <p>Start with a bit about yourself or your business, and include an overview of what you need done.</p>
                <textarea 
                    name="details" 
                    placeholder="Describe your project here..." 
                    rows="4"
                    value={this.state.value}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    className={this.state.emptyError ? "BorderError" : null}
                />
                <div className="ErrorAndCharsRem">
                    { this.state.error ? <span className="detailsError error">Please enter atmost 4000 characters</span> : <span></span>}
                    { this.state.emptyError ? <span className="detailsError error">Please enter a description</span> : <span></span>}
                    <span className="CharactersRemaining">{this.characterLimit-this.state.length} characters remaining</span>
                </div>
            </React.Fragment>
        )
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


export default connect(mapStoreToProps, mapDispatchToProps) (Details);

// export default Details;