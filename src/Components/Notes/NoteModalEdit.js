import React, { useState, useEffeсе } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { format } from "date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from "@date-io/date-fns";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Loader from "../Loader";

import Checkbox from "@material-ui/core/Checkbox";
const useStyles = makeStyles(theme => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    "&:hover": {
      color: "#CCDD00",
      background: "#656565"
    }
  },
  containerNote: {
    position: "relative",
    height: "70px",
    display: "flex",
    background: "#3dc0AA",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 5,
    color: "#fff",
    margin: 16
  },
  title: {
    color: theme.palette.primary.main
  },
  titleBar: {
    background: "rgba(0,0,0,0.1)"
  },
  item: {
    listStyle: "none"
  },
  container: {
    display: "flex",
    flexDirection: "column"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  datepicker: {
    width: "96%",
    padding: "12px 12px 10px",
    position: "relative",
    transition: "background-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
    backgroundColor: "rgba(0, 0, 0, 0.09)",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    color: "rgba(0, 0, 0, 0.87)",
    cursor: "text",
    display: "inline-flex",
    position: "relative",
    fontSize: "1rem",
    boxSizing: "border-box",
    alignItems: "center",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    lineHeight: "1.1875em",
    marginLeft: 7
  },
  "&:before": {
    left: 0,
    right: 0,
    bottom: 0,
    content: "",
    position: "absolute",
    transition: "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
    pointerEvents: "none"
  },
  "&:after": {
    left: 0,
    right: 0,
    bottom: 0,
    content: "",
    position: "absolute",
    transform: "scaleX(0)",
    transition: "transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
    borderBottom: "2px solid #26418F",
    pointerEvents: "none"
  },
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.13)"
  },
  "&:focus": {
    outline: "-webkit-focus-ring-color auto 1px"
  }
}));

const types = [
  { value: "urgentImportant", label: "Срочное и Важное" },
  { value: "notUrgentImportant", label: "Не Срочное, Важное" },
  { value: "urgentNotImportant", label: "Срочное, Не Важное" },
  { value: "notUrgentNotImportant", label: "Срочное, Важное" }
];

export default props => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [status, setStatus] = useState(props.status);
  const [body, setBody] = useState(props.body);
  const [deadline, setDeadline] = useState(props.deadline);
  const [type, setType] = useState(props.type);
  const [priority, setPriority] = useState(props.priority);
  const [tags, setTags] = useState(props.tags);
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = event => {
    setStatus(event.target.checked);
  };
  const onChangeTitle = e => setTitle(e.target.value);
  const onChangeBody = e => setBody(e.target.value);
  const onChangePriority = e => setPriority(e.target.value);
  const onChangeType = e => setType(e.target.value);
  const onSubmit = () => {};
  return (
    <div>
      <div className={classes.containerNote}>
        <div className={classes.checkboxContainer} onClick={handleClickOpen}>
          <Checkbox
            checked={status}
            onChange={handleChange}
            value={status}
            inputProps={{
              "aria-label": "primary checkbox"
            }}
          />
        </div>
        <div className={classes.textContainer}>
          <Typography>{title}</Typography>
          <Typography>
            {format(new Date(deadline._seconds * 1000), "dd/MM/yyyy")}
          </Typography>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={onSubmit}>
          <DialogContent className={classes.container}>
            <TextField
              id="filled-title"
              label="Заголовок"
              className={classes.textField}
              value={title}
              onChange={onChangeTitle}
              margin="normal"
              variant="filled"
            />
            <TextField
              id="filled-body"
              label="Тело заметки"
              className={classes.textField}
              value={body}
              onChange={onChangeBody}
              margin="normal"
              variant="filled"
              multiline
              rowsMax="4"
            />
            <TextField
              id="filled-select-type"
              select
              label="Тип"
              className={classes.textField}
              value={type}
              onChange={onChangeType}
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
              margin="normal"
              variant="filled"
            >
              {types.map(type => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="filled-title"
              label="Приоритет"
              className={classes.textField}
              value={priority}
              onChange={onChangePriority}
              margin="normal"
              variant="filled"
              type="number"
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
              <KeyboardDatePicker
                className={classes.datepicker}
                value={deadline}
                onChange={setDeadline}
                cancelLabel="ОТМЕНА"
                okLabel="ОК"
                format="dd/MM/yyyy"
              />
            </MuiPickersUtilsProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Отменить
            </Button>
            <Button onClick={handleClose} color="primary">
              Сохранить
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
