import React, { useState,} from 'react';
import './App.css';
import Template from './components/template';
import Nav from './components/nav'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home'
// import Webcam_block from './components/Webcam'

import {createStore} from 'redux';
import { Provider } from 'react-redux'
import allReducers from './Redux/Reducer/Allreducer';
// import {ToggleCamReducer} from './Reducer/ShowCam';

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  )




function App() {  
  return (
    <Provider store = {store}>
      <Router>
        <div className="App">
          <Nav/>    
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/user/:firstName" component={Template}  />
          </Switch>
        </div>
    </Router>
    </Provider>
    
  );
}
export default App;
