import React from "react";
import {Grid} from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import { createBrowserHistory } from 'history'
import Home from './Home';
import About from './About';
import ContactUs from "./ContactUs";
import CreateUser from './Admin/User/CreateUser';
import Register from "./Auth/Register";
import ContinueRegister from "./Auth/ContinueRegister";
import RegisterComplete from "./RegisterComplete";
import Auth from './Auth';
import Chat from './Chat/Chat';
import { UserProvider }  from '../contexts/UserProvider';
import Login from "./Auth/Login";
import Navbar from "./Navbar";
import UnAuth from "./UnAuth";
import Profile from "./Profile/Profile";
import ForgotPassword from "./Auth/ForgotPassword";
import CheckMail from "./Auth/CheckMail";
import ResetPassword from "./Auth/ResetPassword";
import CreateFaculty from "./Admin/Faculty/CreateFaculty";
import Faculty from "./Faculty/Faculty";
import FacultiesList from "./Admin/Faculty/FacultiesList"
import EditFaculty from "./Admin/Faculty/EditFaculty";
import Subjects from "./Professor/Subjects";
import Subject from "./Professor/Subject";
import UsersList from "./Professor/UsersList";
import StudentDetails from "./Professor/StudentDetails";
import Professor from "./Professor/Professor";
import Colleges from './Colleges';

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
            <Route path="/colleges" render={ props => <Colleges {...props} />} />
            <Route path="/admin/create-user" render={ props => <CreateUser {...props} />} />
            <Auth path="/admin/create-faculty"component={CreateFaculty} />
            <Auth path="/admin/faculties-list" component={FacultiesList} />
            <Auth path="/admin/edit-faculty" component={EditFaculty} />
            <Auth path="/professor/subjects" component={Subjects} />
            <Auth path="/professor/subject" component={Subject} />
            <Auth path="/professor/students" component={UsersList} />
            <Auth exact path="/professor" component={Professor} />
            <Auth path="/professor/student-details" component={StudentDetails} />
            <Route path="/register" render={ props => <Register {...props} />} />
            <Route path="/continue-register" render={ props => <ContinueRegister {...props} />} />
            <Route path="/register-complete" render={ props => <RegisterComplete {...props} />} />
            <Route path="/check-email" render={props => <CheckMail {...props} />} />
            <UnAuth path="/login" component={Login} />
            <UnAuth path="/auth/forgot-password" component={ForgotPassword} />
            <UnAuth path="/auth/reset/:resetToken" component={ResetPassword} />
            <Auth path="/chat" component={Chat} />
            <Auth path="/profile" component={Profile} />
            <Auth path="/Faculty" component={Faculty} />
          </Switch>
        </UserProvider>
    </Router>
  );
};

export default App;