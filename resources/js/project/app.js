import React from 'react';

import './app.css';
import logo from './freelancer-logo-light.svg';

import Details from './FormComponents/details/details';
import Name from './FormComponents/name/name';
import Skills from './FormComponents/skills/skills';
import Payment from './FormComponents/payment/payment';
import PostButton from './FormComponents/PostButton/PostButton';

import { connect } from 'react-redux';

class App extends React.Component
{
  constructor (props)
  {
    super(props);
    this.state = {
    };

    this.progress = this.progress.bind(this);
  }

  componentDidMount ()
  {
    this.props.connect('app.js');
  }

  progress (e)
  {
    e.preventDefault();

    // progress validation logic
    if (this.props.nextButtonDisable)
    {
      return;
    }

    this.props.handleNextButtonDisable(true);
    this.props.handleNextClick();
    this.props.disableNextButton();
  }


  render ()
  {
    let afterDetailsNextButton, afterSkillsNextButton = null;

    if (this.props.nextClicked === 0) {
      afterDetailsNextButton = 
        <div className="NextButtonContainer">
          <button 
            className={"NextButton" + (this.props.nextButtonDisable===true ? ' NextButtonDisable' : '') }
            onClick={(e) => this.progress(e)}
          >Next</button>
        </div>;
    }
    

    if (this.props.nextClicked === 1)
    {
      afterDetailsNextButton = null;
      afterSkillsNextButton = 
        <div className="NextButtonContainer">
          <button
            onClick={(e) => this.progress(e)}
            className={"NextButton" + (this.props.nextButtonDisable ? ' NextButtonDisable' : '') }
          >Next</button>
        </div>;
    }
    


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
                      { afterDetailsNextButton }
                      { this.props.nextClicked > 0 ? 
                        <Skills />                     
                      : null}
                      { afterSkillsNextButton }
                      { this.props.nextClicked > 1 ?
                        <React.Fragment>
                          <Payment />
                          <PostButton />
                        </React.Fragment>
                      : null}
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
    name: store.name,
    details: store.details,
    skills: store.skills,
    payment: store.payment,
    nextButtonDisable: store.nextButtonDisable,
    nextClicked: store.nextClicked
  }
}

function mapDispatchToProps (dispatch)
{
  return {
    connect: (componentName) => dispatch({type:'connected', componentName}),
    handleNextButtonDisable: (value) => dispatch({type: 'SET_NEXT_BUTTON_STATE', value}),
    handleNextClick: () => dispatch({type: 'NEXT_BUTTON_CLICK'}),
    disableNextButton: () => dispatch({type: 'DISABLE_NEXT_BUTTON'}),
  }
}

export default connect(mapStoreToProps, mapDispatchToProps) (App);

