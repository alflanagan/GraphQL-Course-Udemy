/* eslint-disable no-unused-vars */
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Route, Switch } from 'react-router'

import Post from './components/Post/Post'
import logo from './logo.svg'
import Posts from './pages/Posts/Posts'
import Profile from './pages/Profile/Profile'
import Signin from './pages/Signin/Signin'
import Signup from './pages/Signup/Signup'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route strict exact path="/posts" component={Posts} />
        <Route strict exact path="/signup" component={Signup} />
        <Route strict exact path="/signin" component={Signin} />
        <Route strict exact path="/profile/:id" component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
