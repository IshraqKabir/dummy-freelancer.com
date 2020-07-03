import React from 'react';

import { connect } from 'react-redux';

class Name extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    componentDidMount ()
    {
        this.props.connect('name.js');
    }

    handleChange (event) {
        
        if (event.target.value.length > 255) {
            this.props.handleError('Please enter atmost 255 characters');
        } else {
            this.props.handleError(null);
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
        }
    }

 

    render() {
        return (
            <div className="Input">                
                <h3>Choose a name for your project</h3>
                <input 
                    name="name" 
                    type="text" 
                    placeholder="e.g. Build me a website"
                    value={this.props.value}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    className={this.props.emptyError ? "BorderError" : null}
                />                
                { this.props.error ? <span className="error">{this.props.error}</span> : <span></span>}
                { this.props.emptyError ? <span className="error">Please enter a name</span> : <span></span>}
            </div>
        )
    }
}

function mapStoreToProps (store)
{
  return {
    value: store.name.value,
    error: store.name.error,
    emptyError: store.name.emptyError,
    length: store.name.length,
    nextButtonDisable: store.nextButtonDisable
  }
}

function mapDispatchToProps (dispatch)
{
  return {
    connect: (componentName) => dispatch({type:'connected', componentName}),
    handleChange: (value) => dispatch({type: 'SET_NAME', value}),
    setLength: (value) => dispatch({type: 'SET_NAME_LENGTH', value}),
    handleError: (value) => dispatch({type: 'SET_NAME_ERROR', value}),
    handleEmtpyError: (value) => dispatch({type: 'SET_NAME_EMPTY_ERROR', value}),
    handleNextButton: () => dispatch({type: 'SET_NEXT_BUTTON_STATE'})
  }
}

export default connect(mapStoreToProps, mapDispatchToProps) (Name);
