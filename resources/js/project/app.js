import React from 'react';

import './app.css';
import logo from './freelancer-logo-light.svg';

import Details from './FormComponents/details/details';
import Name from './FormComponents/name/name';
import Skills from './FormComponents/skills/skills';
import Payment from './FormComponents/payment/payment';

import { connect } from 'react-redux';

class App extends React.Component
{
  constructor (props)
  {
    super(props);
    this.state = {
           
    };
  }

  componentDidMount ()
  {
    this.props.connect('app.js');
  }

  render ()
  {
    return (
      <React.Fragment>
          <div className="Wrapper">
              <div className="Background"></div>
              <div className="Container">
              <div className="Top">
              <img src={logo} className="Logo"/>
              <h1>Tell us what you need done</h1>
              <p>Contact skilled freelancers within minutes. View profiles, ratings, portfolios and chat with them. Pay the freelancer only when you are 100% satisfied with their work. </p>
              </div>
              <div className="Form">
                  <div className="FormWrapper">                
                      <Name />
                      <Details />
                      <Skills />
                      <Payment />
                      <button type="submit" className="PostMyProjectButton">Yes, post my project</button>
                  </div>
              </div>
              </div>
          </div>
      </React.Fragment>
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

export default connect(mapStoreToProps, mapDispatchToProps) (App);


// export default App;