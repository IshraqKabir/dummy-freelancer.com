import React from 'react';
import './details.css';

import { connect } from 'react-redux';

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
   
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
            this.props.handleError(true);
        }
        else {
            this.props.handleError(false);
        }

        if (event.target.value.length !== 0)
        {
            this.props.handleEmtpyError(false);
        }

        this.props.handleChange(event.target.value);
        this.props.setLength(event.target.value.length);
        this.props.handleNextButton();
    }

    handleBlur () 
    {
        if (this.props.length === 0)
        {
            this.props.handleEmtpyError(true);
            this.props.handleNextButton();
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
                    value={this.props.value}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    className={this.props.emptyError ? "BorderError" : null}
                />
                <div className="ErrorAndCharsRem">
                    { this.props.error }
                    { this.props.error ? <span className="detailsError error">Please enter atmost 4000 characters</span> : <span></span>}
                    { this.props.emptyError ? <span className="detailsError error">Please enter a description</span> : <span></span>}
                    <span className="CharactersRemaining">{this.characterLimit-this.props.length} characters remaining</span>
                </div>
            </React.Fragment>
        )
    }
}

function mapStoreToProps (store)
{
  return {
      value: store.details.value,
      error: store.details.error,
      emptyError: store.details.emptyError,
      length: store.details.length
  }
}

function mapDispatchToProps (dispatch)
{
  return {
    connect: (componentName) => dispatch({type:'connected', componentName}),
    handleChange: (value) => dispatch({type: 'SET_DETAILS', value}),
    setLength: (value) => dispatch({type: 'SET_DETAILS_LENGTH', value}),
    handleError: (value) => dispatch({type: 'SET_DETAILS_ERROR', value}),
    handleEmtpyError: (value) => dispatch({type: 'SET_DETAILS_EMPTY_ERROR', value}),
    handleNextButton: () => dispatch({type: 'SET_NEXT_BUTTON_STATE'})
  }
}


export default connect(mapStoreToProps, mapDispatchToProps) (Details);
