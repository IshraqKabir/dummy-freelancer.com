import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

import './post-project.css';
import logo from './freelancer-logo-light.svg';

import Details from './FormComponents/details/details';
import Name from './FormComponents/name/name';
import Skills from './FormComponents/skills/skills';


class PostProject extends React.Component {
  render() {
    return(
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
                  <button type="submit" className="PostMyProjectButton">Yes, post my project</button>
                </div>
            </div>
          </div>
      </div>
    );
  }
}

// function PostProject() {

//   const details = [
    
//   ]

//     return (
//       <div className="Wrapper">
//           <div className="Background"></div>
//           <div className="Container">
//             <div className="Top">
//             <img src={logo} className="Logo"/>
//             <h1>Tell us what you need done</h1>
//             <p>Contact skilled freelancers within minutes. View profiles, ratings, portfolios and chat with them. Pay the freelancer only when you are 100% satisfied with their work. </p>
//             </div>
//             <div className="Form">
//                 <div className="FormWrapper">                
//                   <h3>Choose a name for your project</h3>
//                   <input name="name" type="text" placeholder="e.g. Build me a website" />
//                   <h3>Tell us more about your project</h3>
//                   <p>Start with a bit about yourself or your business, and include an overview of what you need done.</p>
//                   <textarea name="details" placeholder="Describe your project here..." rows="4"></textarea>
//                   <button type="submit" class="PostMyProjectButton">Yes, post my project</button>
//                 </div>
//             </div>
//           </div>
//       </div>
//     );
//   }

let domContainer = document.querySelector('#post_project');
ReactDOM.render(<PostProject />, domContainer);