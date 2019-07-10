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
// const styles = theme => ({
//   container: {
//     position: "relative",
//     height: "100px",
//     display: "flex",
//     background: "#3dc0AA",
//     width: "300px",
//     justifyContent: "flex-start",
//     alignItems: "center",
//     borderRadius: 5,
//     color: "#fff"
//   },
//   imageHeader: {
//     height: 30,
//     width: "100%",
//     display: "flex",
//     justifyContent: "flex-end",
//     position: "absolute"
//   },
//   img: {
//     width: "100%",
//     height: "100%"
//   },
//   title: {
//     color: theme.palette.primary.main
//   },
//   titleBar: {
//     background: "rgba(0,0,0,0.1)"
//   },
//   item: {
//     listStyle: "none"
//   },
//   checkboxContainer: {}
// });

// const SortableItem = withStyles(styles)(
//   SortableElement(({ title, deadline, defaultStatus, classes }) => {
//     const [status, setStatus] = React.useState(defaultStatus);

//     const handleChange = event => {
//       setStatus(event.target.checked);
//     };

//     return (
//       <Grid item xs={4} md={4} lg={4}>
//         <div className={classes.container}>
//           <div className={classes.checkboxContainer}>
//             <Checkbox
//               checked={status}
//               onChange={handleChange}
//               value={status}
//               inputProps={{
//                 "aria-label": "primary checkbox"
//               }}
//             />
//           </div>
//           <div className={classes.textContainer}>
//             <Typography>{title}</Typography>
//             <Typography>{deadline}</Typography>
//           </div>
//         </div>
//       </Grid>
//     );
//   })
// );

// const SortableList = SortableContainer(({ notes }) => {
//   return (
//     <Grid
//       container
//       direction="row"
//       justify="center"
//       alignItems="flex-start"
//       spacing={3}
//     >
//       {notes.map((note, index) => (
//         <SortableItem
//           key={`item-${index}`}
//           title={note.title}
//           deadline={note.deadline}
//           defaultStatus={note.status}
//           index={index}
//         />
//       ))}
//     </Grid>
//   );
// });

const contentStyles = {
  paper: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: 24,
    marginBottom: 32,
    background: "rgba(0,0,0,.01)"
  }
};
const useStyles = makeStyles(theme => contentStyles);
export default () => {
  const [content, setContent] = useState({
    urgentImportant: [
      { title: "Поступить в сколтех", deadline: "17-09-19", stauts: false },
      { title: "Закончить работу", deadline: "17-09-19", stauts: true }
    ],
    notUrgentImportant: [
      { title: "Поступить в сколтех", deadline: "17-09-19", stauts: false },
      { title: "Закончить работу", deadline: "17-09-19", stauts: true }
    ],
    urgentNotImportant: [
      { title: "Поступить в сколтех", deadline: "17-09-19", stauts: false },
      { title: "Закончить работу", deadline: "17-09-19", stauts: true }
    ],
    notUrgentNotImportant: [
      { title: "Поступить в сколтех", deadline: "17-09-19", stauts: false },
      { title: "Закончить работу", deadline: "17-09-19", stauts: true }
    ],
    isPending: false
  });
  const classes = useStyles();
  useEffect(() => {
    (async () => {
      setContent({
        urgentImportant: [
          { title: "Поступить в сколтех", deadline: "17-09-19", stauts: false },
          { title: "Закончить работу", deadline: "17-09-19", stauts: true }
        ],
        notUrgentImportant: [
          { title: "Поступить в сколтех", deadline: "17-09-19", stauts: false },
          { title: "Закончить работу", deadline: "17-09-19", stauts: true }
        ],
        urgentNotImportant: [
          { title: "Поступить в сколтех", deadline: "17-09-19", stauts: false },
          { title: "Закончить работу", deadline: "17-09-19", stauts: true }
        ],
        notUrgentNotImportant: [
          { title: "Поступить в сколтех", deadline: "17-09-19", stauts: false },
          { title: "Закончить работу", deadline: "17-09-19", stauts: true }
        ],
        isPending: false
      });
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
      <NoteModal />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h5" gutterBottom>
            Срочные, Важные
          </Typography>
          <Paper className={classes.paper} elevation={2}>
            <Notes items={urgentImportant} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5" gutterBottom>
            НЕ Срочные, Важные
          </Typography>
          <Paper className={classes.paper} elevation={2}>
            <Notes items={notUrgentImportant} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5" gutterBottom>
            Срочные, НЕ Важные
          </Typography>
          <Paper className={classes.paper} elevation={2}>
            <Notes items={urgentNotImportant} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
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

// export default () => {
//   return <div>it renders</div>;
// };

const Notes = ({ items }) => {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="flex-start"
      spacing={3}
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
    width: "300px",
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
    <Grid item xs={4} md={4} lg={4}>
      <div className={classes.container}>
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
          <Typography>{deadline}</Typography>
        </div>
      </div>
    </Grid>
  );
};
