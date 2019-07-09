import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";
import Landing from "./Components/Landing";
import Loader from "./Components/Loader";
import Drawer from "./Containers/Drawer";
import Notes from "./Components/Notes";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#5C6BC0", light: "#8E99F3", dark: "#26418F" },
    secondary: { main: "#80CBC4", light: "#B2FEF7", dark: "#4F9A94" }
  }
});

export default () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [appLoaded, setAppLoaded] = useState(false);
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const token = await userAuth.getIdToken();
        const userRef = await createUserProfileDocument(userAuth);
        if (userRef === undefined) {
          setCurrentUser(userAuth);
        } else {
          userRef.onSnapshot(snapShot => {
            setCurrentUser({ id: snapShot.id, ...snapShot.data(), token });
          });
        }
      } else {
        setCurrentUser(userAuth);
      }
    });
    return () => unsubscribeFromAuth();
  });
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
                  <Pipeline />
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
            <Route exact path="/notes" component={Notes} />
          </Drawer>
        ) : (
          <Loader />
        )}
      </Switch>
    </MuiThemeProvider>
  );
};
