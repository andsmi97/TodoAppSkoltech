import React from "react";
import Popper from "@material-ui/core/Popper";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { auth } from "../../firebase/firebase.utils";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles(theme => ({
  avatar: {
    margin: 10
  },
  typography: {
    padding: theme.spacing(2)
  }
}));
export default ({ currentUser }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <div>
      <Avatar
        alt={currentUser.displayName}
        src={currentUser.photoURL}
        className={classes.avatar}
        onClick={handleClick}
      />
      <Popper
        className={classes.popper}
        placement="bottom"
        disablePortal={true}
        modifiers={{
          flip: {
            enabled: false
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: "scrollParent"
          }
        }}
        id={id}
        open={open}
        anchorEl={anchorEl}
      >
        <Paper>
          <Typography className={classes.typography}>
            <Button onClick={() => auth.signOut()}>Выйти</Button>
          </Typography>
        </Paper>
      </Popper>
    </div>
  );
};
