import {BrowserRouter as Router} from 'react-router-dom';
import React, { useEffect } from 'react';
import Dashboard from './containers/Dashboard'
import { useDispatch} from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./state/index";

function App() {
  const dispatch = useDispatch();
  const {initBackendData} = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    const interval = setInterval(() => {
      initBackendData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Router>
      <Dashboard/>
    </Router>
  );
}

export default App;
