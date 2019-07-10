import React, { Component, useState, useEffect } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import Grid from "@material-ui/core/Grid";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import agent from "../../agent";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Loader from "../Loader";
import AddIcon from "@material-ui/icons/Add";
import Checkbox from "@material-ui/core/Checkbox";
import NoteModal from "./NoteModal";
import NoteModalEdit from "./NoteModalEdit";

import { format } from "date-fns";
const contentStyles = {
  paper: {
    display: "flex",
    // justifyContent: "center",
    // flexDirection: "column",
    padding: 24,
    marginBottom: 32,
    background: "rgba(0,0,0,.01)",
    height: "100%"
  },
  table: {
    height: "40vh",
    marginBottom: 50
  }
};
const useStyles = makeStyles(theme => contentStyles);
export default () => {
  const [content, setContent] = useState({
    urgentImportant: [],
    notUrgentImportant: [],
    urgentNotImportant: [],
    notUrgentNotImportant: [],
    isPending: false
  });
  const addNote = note => {
    setContent({ ...content, [note.type]: [...content[note.type], note] });
  };
  const classes = useStyles();
  useEffect(() => {
    (async () => {
      const notes = await agent.Notes.all();
      console.log(
        notes.reduce(
          (acc, note) => {
            if (note.type === "urgentImportant") {
              acc.urgentImportant = [...acc.urgentImportant, note];
            }
            if (note.type === "notUrgentImportant") {
              acc.notUrgentImportant = [...acc.notUrgentImportant, note];
            }
            if (note.type === "urgentNotImportant") {
              acc.urgentNotImportant = [...acc.urgentNotImportant, note];
            }
            if (note.type === "notUrgentNotImportant") {
              acc.notUrgentNotImportant = [...acc.notUrgentNotImportant, note];
            }
            return acc;
          },
          {
            urgentImportant: [],
            notUrgentImportant: [],
            urgentNotImportant: [],
            notUrgentNotImportant: []
          }
        )
      );
      setContent(
        notes.reduce(
          (acc, note) => {
            if (note.type === "urgentImportant") {
              acc.urgentImportant = [...acc.urgentImportant, note];
            }
            if (note.type === "notUrgentImportant") {
              acc.notUrgentImportant = [...acc.notUrgentImportant, note];
            }
            if (note.type === "urgentNotImportant") {
              acc.urgentNotImportant = [...acc.urgentNotImportant, note];
            }
            if (note.type === "notUrgentNotImportant") {
              acc.notUrgentNotImportant = [...acc.notUrgentNotImportant, note];
            }
            return acc;
          },
          {
            urgentImportant: [],
            notUrgentImportant: [],
            urgentNotImportant: [],
            notUrgentNotImportant: []
          }
        )
      );
    })();

    return () =>
      setContent({
        urgentImportant: [],
        notUrgentImportant: [],
        urgentNotImportant: [],
        notUrgentNotImportant: [],
        isPending: false
      });
  }, content);

  const {
    urgentImportant,
    notUrgentImportant,
    urgentNotImportant,
    notUrgentNotImportant,
    isPending
  } = content;
  if (isPending) {
    return <Loader />;
  }
  return (
    <React.Fragment>
      <NoteModal addNote={addNote} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} className={classes.table}>
          <Typography variant="h5" gutterBottom>
            Срочные, Важные
          </Typography>
          <Paper className={classes.paper} elevation={2}>
            <Notes items={urgentImportant} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} className={classes.table}>
          <Typography variant="h5" gutterBottom>
            НЕ Срочные, Важные
          </Typography>
          <Paper className={classes.paper} elevation={2}>
            <Notes items={notUrgentImportant} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} className={classes.table}>
          <Typography variant="h5" gutterBottom>
            Срочные, НЕ Важные
          </Typography>
          <Paper className={classes.paper} elevation={2}>
            <Notes items={urgentNotImportant} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} className={classes.table}>
          <Typography variant="h5" gutterBottom>
            НЕ Срочные, НЕ Важные
          </Typography>
          <Paper className={classes.paper} elevation={2}>
            <Notes items={notUrgentNotImportant} />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const useNotesStyles = makeStyles(theme => ({
  wrapper: {
    overflow: "auto",
    height: "100%",
    alignContent: "flex-start"
  }
}));
const Notes = ({ items }) => {
  const classes = useNotesStyles();
  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      spacing={0}
      className={classes.wrapper}
    >
      {items.map((note, index) => (
        <Note
          key={`item-${index}`}
          title={note.title}
          deadline={note.deadline}
          defaultStatus={note.status}
          index={index}
        />
      ))}
    </Grid>
  );
};

const useNoteStyles = makeStyles(theme => ({
  container: {
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
  }
}));

const Note = ({ title, deadline, defaultStatus }) => {
  const [status, setStatus] = React.useState(defaultStatus);
  const classes = useNoteStyles();
  const handleChange = event => {
    setStatus(event.target.checked);
  };
  return (
    <Grid item xs={12} md={6} lg={6}>
      {/* <div className={classes.container}>
        <div className={classes.checkboxContainer}>
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
      </div> */}
      <NoteModalEdit title={title} deadline={deadline} status={defaultStatus} />
    </Grid>
  );
};
