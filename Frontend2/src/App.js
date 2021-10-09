import {BrowserRouter as Router} from 'react-router-dom';
import Dashboard from './containers/Dashboard'
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./state/index";

function App() {
  const dispatch = useDispatch();
  const {initBackendData} = bindActionCreators(actionCreators, dispatch);

  initBackendData();
  return (
    <Router>
      <Dashboard/>
    </Router>
  );
}

export default App;
