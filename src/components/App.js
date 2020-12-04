import React from "react";
import {Grid} from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import { createBrowserHistory } from 'history'
import Home from './Home';
import About from './About';
import ContactUs from "./ContactUs";
import CreateUser from './CreateUser';
import Register from "./Register";
import ContinueRegister from "./ContinueRegister";
import RegisterComplete from "./RegisterComplete";
import Auth from './Auth';
import Chat from './Chat/Chat';
import { UserProvider }  from '../contexts/UserProvider';
import Login from "./Login";
import Navbar from "./Navbar";
import UnAuth from "./UnAuth";
import Profile from "./Profile/Profile";

//const history = createBrowserHistory()

const App = () => {

  return(
    <Router>
      <UserProvider>
        <Grid>
          <Navbar />
        </Grid>
          <Switch>
            <Route exact path="/" render={ props => <Home {...props} />} />
            <Route path="/about" render={ props => <About {...props} />} />
            <Route path="/contact-us" render={ props => <ContactUs {...props} />} />
            <Route path="/create-user" render={ props => <CreateUser {...props} />} />
            <Route path="/register" render={ props => <Register {...props} />} />
            <Route path="/continue-register" render={ props => <ContinueRegister {...props} />} />
            <Route path="/register-complete" render={ props => <RegisterComplete {...props} />} />
            <UnAuth path="/login" component={Login} />
            <Auth path="/chat" component={Chat} />
            <Auth path="/profile" component={Profile} />
          </Switch>
        </UserProvider>
    </Router>
  );
};

export default App;
