import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Modal from "./Modal";
import Snackbar from "./Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
const useStyles = makeStyles(styles);
export default () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    message: "",
    username: "",
    password: "",
    snackbarOpen: false,
    modalOpen: false
  });

  const classes = useStyles();
  const handleSnackBarClose = () => (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    return setState({ ...state, snackbarOpen: !state.snackbarOpen });
  };
  const handleSnackBarOpen = () => {
    return setState({ ...state, snackbarOpen: !state.snackbarOpen });
  };

  const handleModal = () => setState({ ...state, modalOpen: !state.modalOpen });

  const handleChange = field => event => {
    return setState({ ...state, [field]: event.target.value });
  };

  let scroll;
  return (
    <React.Fragment>
      <Snackbar
        open={state.snackbarOpen}
        onClose={handleSnackBarClose}
        message={"Сообщение успешно отправлено"}
      />

      <div className={classes.section}>
        <div className={classes.navbar}>
          <div className={classes.logo}>
            <img src="/images/Logo.svg" alt="" />
          </div>
          <div className={classes.links}>
            <ul className={classes.list}>
              <li>
                <Button href="#features" className={classes.link}>
                  Особенности
                </Button>
              </li>
              <li>
                <Button href="#prices" className={classes.link}>
                  Цены
                </Button>
              </li>
              <li>
                <Button href="#contacts" className={classes.link}>
                  Контакты
                </Button>
              </li>
            </ul>
            <Modal buttonName="Начать бесплатно" marginTop={0} />
          </div>
        </div>

        <div className={classes.contetWelcome}>
          <Grid
            container
            spacing={4}
            alignItems="center"
            direction="row"
            className={classes.container}
            justify="center"
          >
            <Grid item xs={6}>
              <div className={classes.textblock}>
                <h2 className={classes.h2}>
                  Хотите увеличить{" "}
                  <span className={classes.highlight}>продажи</span>?
                </h2>
                <h3 className={classes.h3}>
                  Воспользуйтесь{" "}
                  <span className={classes.logotext}>
                    {" "}
                    <img
                      src="/images/Inline Logo.svg"
                      alt="FluentCRM logo"
                      className={classes.logotext}
                    />
                  </span>{" "}
                  для элементарного управления сделками с клиентами
                </h3>
                <Modal buttonName="Подробнее" marginTop={30} />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.imgblock}>
                <img src="/images/Dashboard.svg" alt="FluentCRM Dashboard" />
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className={classes.contet} id="features">
        <Grid
          container
          spacing={4}
          alignItems="center"
          direction="row"
          className={classes.contentContainer}
          justify="center"
        >
          <Grid item xs={6}>
            <div className={classes.imgblock}>
              <img src="/images/Deal.svg" alt="FluentCRM Deal" />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.textblock}>
              <h2 className={classes.h2}>
                Заключайте <span className={classes.highlight}>сделки</span>
              </h2>
              <h3 className={classes.h3}>
                И следите за ними в единой системе, для того чтобы в любой
                момент времени получить о них информацию
              </h3>
              <Modal buttonName="Подробнее" marginTop={30} />
            </div>
          </Grid>
        </Grid>
      </div>
      <div className={classes.contet}>
        <Grid
          container
          spacing={4}
          alignItems="center"
          direction="row"
          className={classes.contentContainerSecondary}
          justify="center"
        >
          <Grid item xs={6}>
            <div className={classes.textblock}>
              <h2 className={classes.h2}>
                Ставьте <span className={classes.highlight}>задачи</span>
              </h2>
              <h3 className={classes.h3}>
                И отслеживайте их выполнение менеджерами
              </h3>
              <Modal buttonName="Подробнее" marginTop={30} />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.imgblock}>
              <img src="/images/TaskImage.svg" alt="FluentCRM Deal" />
            </div>
          </Grid>
        </Grid>
      </div>
      <div className={classes.contet}>
        <Grid
          container
          spacing={4}
          alignItems="center"
          direction="row"
          className={classes.contentContainer}
          justify="center"
        >
          <Grid item xs={6}>
            <div className={classes.imgblock}>
              <img src="/images/CoopImage.svg" alt="FluentCRM CoopImage" />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.textblock}>
              <h2 className={classes.h2}>
                Заключайте <span className={classes.highlight}>сделки</span>
              </h2>
              <h3 className={classes.h3}>
                <span className={classes.logotext}>
                  {" "}
                  <img
                    src="/images/Inline Logo.svg"
                    alt="FluentCRM logo"
                    className={classes.logotext}
                  />
                </span>{" "}
                предназначена для работы с несколькими пользователями
              </h3>
              <Modal buttonName="Подробнее" marginTop={30} />
            </div>
          </Grid>
        </Grid>
      </div>
      <div className={classes.contet}>
        <Grid
          container
          spacing={4}
          alignItems="center"
          direction="row"
          className={classes.contentContainerSecondary}
          justify="center"
        >
          <Grid item xs={6}>
            <div className={classes.textblock}>
              <h2 className={classes.h2}>
                Используйте <span className={classes.highlight}>везде</span>
              </h2>
              <h3 className={classes.h3}>
                <span className={classes.logotext}>
                  {" "}
                  <img
                    src="/images/Inline Logo.svg"
                    alt="FluentCRM logo"
                    className={classes.logotext}
                  />
                </span>{" "}
                приспособлена для использования на любых устройствах от телефона
                до компьютера
              </h3>
              <Modal buttonName="Подробнее" marginTop={30} />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.imgblock}>
              <img src="/images/TaskImage.svg" alt="FluentCRM Deal" />
            </div>
          </Grid>
        </Grid>
      </div>
      <div className={classes.contet} id="prices">
        <Grid
          container
          spacing={4}
          alignItems="center"
          direction="row"
          className={classes.contentContainer}
          justify="center"
        >
          <Grid item xs={6}>
            <div className={classes.imgblock}>
              <img src="/images/Payment.svg" alt="FluentCRM CoopImage" />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.textblock}>
              <h2 className={classes.h2}>
                И все это <span className={classes.highlight}>бесплатно</span>
              </h2>
              <h3 className={classes.h3}>
                Все верно, для того чтобы пользоваться FluentCRM не нужно
                платить ни копейки
              </h3>
              <Modal buttonName="Подробнее" marginTop={30} />
            </div>
          </Grid>
        </Grid>
      </div>
      <div className={classes.section} id="contacts">
        <Grid
          container
          spacing={4}
          alignItems="center"
          direction="row"
          className={classes.container}
          justify="center"
        >
          <Grid item xs={6}>
            <div className={classes.textblock}>
              <h2 className={classes.h2}>
                Остались <span className={classes.highlight}>вопросы</span>?
              </h2>
              <h3 className={classes.h3}>
                Напишите нам и мы ответим Вам в ближайшее время.
              </h3>
              <form className={classes.form} noValidate autoComplete="off">
                <TextField
                  id="standard-name"
                  label="Имя"
                  className={classes.textField}
                  value={state.name}
                  onChange={handleChange("name")}
                  margin="normal"
                />
                <TextField
                  id="standard-name"
                  label="Email"
                  className={classes.textField}
                  value={state.email}
                  onChange={handleChange("email")}
                  margin="normal"
                  type="email"
                />
                <TextField
                  id="standard-multiline-flexible"
                  label="Сообщение"
                  multiline
                  rowsMax="4"
                  value={state.message}
                  onChange={handleChange("message")}
                  className={classes.textField}
                  margin="normal"
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.pageButton}
                  onClick={handleSnackBarClose()}
                >
                  Написать
                </Button>
              </form>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.imgblock}>
              <img src="/images/ContactUs.svg" alt="FluentCRM Deal" />
            </div>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};
