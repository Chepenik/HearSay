import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute"
import UserProfile from "./UserProfile";
import SocialMediaShow from "./SocialMediaShow";
import SocialMediaForm from "./SocialMediaForm";
import SocialMediaList from "./SocialMediaList";
import EditForm from "./EditForm";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/">
          <SocialMediaList />
        </Route>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/comments/:id/edit" component={EditForm} />
        <Route exact path="/websites/:id" component={SocialMediaShow} />
        <AuthenticatedRoute exact path="/profile" component ={UserProfile} user={currentUser} />
        <AuthenticatedRoute
          exact path="/add-site"
          component={SocialMediaForm}
          user={currentUser}
        />
      </Switch>
    </Router>
  );
};

export default hot(App);
