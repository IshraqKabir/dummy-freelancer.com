import React from 'react';
import ReactDOM from 'react-dom';

import './mycomponent.css';
import PostProject from './project/'

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return (
      <React.Fragment>
      <button onClick={() => this.setState({ liked: true }) }>
        Like
      </button>
      <div className="Wrapper">
        asdfjlkasjdf
      </div>
      </React.Fragment>
    );
  }
}

let domContainer = document.querySelector('#like_button_container');
ReactDOM.render(<LikeButton />, domContainer);