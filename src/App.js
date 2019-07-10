import React, { useState, useEffect } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";
import Landing from "./Components/Landing";
import Loader from "./Components/Loader";
import Drawer from "./Components/Drawer";
import Notes from "./Components/Notes";
import agent from "./agent";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { makeStyles } from "@material-ui/core/styles";
const theme = createMuiTheme({
  palette: {
    primary: { main: "#A2BE15", light: "#8E99F3", dark: "#26418F" },
    secondary: { main: "#80CBC4", light: "#B2FEF7", dark: "#4F9A94" }
  }
});
const useStyles = makeStyles(theme => ({
  "@global": {
    "*": {
      margin: 0,
      padding: 0
    }
  }
}));
export default () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [appLoaded, setAppLoaded] = useState(true);
  const classes = useStyles();
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const token = await userAuth.getIdToken();
        console.log(token);
        agent.setToken(token);
        const userRef = await createUserProfileDocument(userAuth);
        if (userRef === undefined) {
          setCurrentUser(userAuth);
        } else {
          userRef.onSnapshot(snapShot => {
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data(),
              token,
              photoURL: userAuth.photoURL
            });
          });
        }
      } else {
        setCurrentUser(userAuth);
      }
    });
    return () => unsubscribeFromAuth();
  }, []);
  return (
    <MuiThemeProvider theme={theme}>
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            appLoaded ? (
              currentUser ? (
                <Drawer currentUser={currentUser}>
                  <Notes />
                </Drawer>
              ) : (
                <Landing />
              )
            ) : (
              <Loader />
            )
          }
        />
        {appLoaded ? (
          <Drawer currentUser={currentUser}>
            <Route exact path="/" component={Notes} />
          </Drawer>
        ) : (
          <Loader />
        )}
      </Switch>
    </MuiThemeProvider>
  );
};
