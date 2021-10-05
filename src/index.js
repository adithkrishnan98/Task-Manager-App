import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from "react-redux";
import taskReducer from './features/taskInfo';

// a store consists of all the reducers we will need in our application ie all the states that we need managed. The store is provided to the app component by the Provider which maps the store to the store created. Now this means the states 
//within the reducers are avaialble throughout the app component and within it
// reducer is a function that takes in information about a current state and it also takes some action that we want to perform on the states and returns the new values of the state
const store = configureStore({
  reducer : {
    task : taskReducer,
  }
})

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

