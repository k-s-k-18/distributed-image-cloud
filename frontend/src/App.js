
import {Route,Switch, BrowserRouter as Router} from 'react-router-dom';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Dashboard from './components/Dashboard.js'


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login/>
          </Route>
          <Route path='/login'>
            <Login/>
          </Route>
          <Route path='/register'>
            <Register/>
          </Route>
          <Route path='/dashboard'>
            <Dashboard/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
