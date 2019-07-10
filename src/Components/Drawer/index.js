import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "./Avatar";
import { auth } from "../../firebase/firebase.utils";
const drawerWidth = 280;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    background: "#656565"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "space-between"
  },
  avatar: {
    margin: 10
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  appFont: {
    color: "#CCDD00"
  }
}));

export default ({ currentUser, children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Avatar currentUser={currentUser} />
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.appFont}
          >
            Заметки
          </Typography>
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  );
};
