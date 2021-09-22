import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './component/Register';
import Home from './component/Home';
import Login from './component/Login';
import Header from './component/Headers';

function App() {
  return (
    <Router>
      <Header/>
      <div className="container px-md-5">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/Login' component={Login} />
          <Route path='/Register' component={Register} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
