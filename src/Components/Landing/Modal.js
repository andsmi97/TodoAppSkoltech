import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListErrors from "../ListErrors";
import {
  auth,
  signInWithGoogle,
  createUserProfileDocument
} from "../../firebase/firebase.utils.js";
const useStyles = makeStyles(theme => ({
  button: props => ({
    borderRadius: "50px",
    marginTop: props.marginTop,
    "&:hover": {
      color: "#CCDD00",
      background: "#656565"
    }
  }),
  container: {
    width: "100%",
    margin: 0
  },
  leftImage: {
    width: "100%"
  }
  // button: {
  //   borderRadius: "50px",
  //   marginTop: 30
  // }
}));

export default props => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState("");
  const classes = useStyles(props);

  const changeEmail = e => setEmail(e.target.value);
  const changePassword = e => setPassword(e.target.value);
  const changeUsername = e => setUsername(e.target.value);
  const handleClose = () => setOpen(false);
  const handleChange = (event, value) => setValue(value);
  const handleChangeIndex = index => setValue(index);

  const onSignInSubmit = async event => {
    event.preventDefault();
    setInProgress(true);
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setInProgress(false);
    } catch (e) {
      setInProgress(false);
      console.log(e);
    }
  };
  const onSignUpSubmit = async event => {
    event.preventDefault();
    setInProgress(true);
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user);
      setInProgress(false);
    } catch (error) {
      console.error(error);
      setInProgress(false);
    }
  };
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        onClick={() => setOpen(true)}
      >
        {props.buttonName}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
      >
        <Grid
          container
          spacing={32}
          alignItems="center"
          direction="row"
          className={classes.container}
          justify="center"
        >
          <Grid item xs={6}>
            <img
              src="/images/Auth.svg"
              alt="FluentCRM logo"
              className={classes.leftImage}
            />
          </Grid>
          <Grid item xs={6}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              centered
            >
              <Tab label="Войти" />
              <Tab label="Регистрация" />
            </Tabs>
            <SwipeableViews
              axis={"x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <div>
                <form onSubmit={onSignInSubmit}>
                  {/* <form> */}
                  <div>
                    <DialogTitle id="form-dialog-title">Войти</DialogTitle>
                    <DialogContent>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="Email"
                        label="Email"
                        type="text"
                        fullWidth
                        value={email}
                        onChange={changeEmail}
                      />
                      <TextField
                        margin="dense"
                        id="password"
                        label="Пароль"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={changePassword}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={signInWithGoogle} color="primary">
                        Войти с Google
                      </Button>
                      <Button onClick={handleClose} color="primary">
                        Отмена
                      </Button>
                      <Button
                        color="primary"
                        disabled={inProgress}
                        type="submit"
                      >
                        Войти
                      </Button>
                    </DialogActions>
                  </div>
                </form>
                <ListErrors errors={errors} />
              </div>
              <div>
                <form onSubmit={onSignUpSubmit}>
                  {/* <form> */}
                  <DialogTitle id="form-dialog-title">Регистрация</DialogTitle>
                  <DialogContent>
                    <TextField
                      margin="dense"
                      id="email"
                      label="Email"
                      type="email"
                      fullWidth
                      defaultValue={email}
                      onChange={changeEmail}
                    />
                    <TextField
                      margin="dense"
                      id="password"
                      label="Пароль"
                      type="password"
                      fullWidth
                      defaultValue={password}
                      onChange={changePassword}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Отмена
                    </Button>
                    <Button color="primary" type="submit" disabled={inProgress}>
                      Регистрация
                    </Button>
                  </DialogActions>
                </form>
                <ListErrors errors={errors} />
              </div>
            </SwipeableViews>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};
