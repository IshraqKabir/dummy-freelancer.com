import React from 'react';
import ReactDOM from 'react-dom';

import Jobs from './jobs';

import reducer from './store/reducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(reducer, composeWithDevTools( ));


class App extends React.Component {
    render() {
        return(
            <Provider store={store}>
                <Jobs />
            </Provider>
        );
    }
}

let domContainer = document.querySelector('#jobs');
ReactDOM.render(<App />, domContainer);
