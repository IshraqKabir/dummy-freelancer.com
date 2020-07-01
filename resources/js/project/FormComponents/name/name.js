import React from 'react';

import { connect } from 'react-redux';

class Name extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            length: 0,
            error: false,
            emptyError: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    componentDidMount ()
    {
        this.props.connect('name.js');
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
            <div className="Input">                
                <h3>Choose a name for your project</h3>
                <input 
                    name="name" 
                    type="text" 
                    placeholder="e.g. Build me a website"
                    value={this.state.value}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    className={this.state.emptyError ? "BorderError" : null}
                />                
                { this.state.error ? <span className="error">Please enter atmost 255 characters</span> : <span></span>}
                { this.state.emptyError ? <span className="error">Please enter a name</span> : <span></span>}
            </div>
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

export default connect(mapStoreToProps, mapDispatchToProps) (Name);

// export default Name;