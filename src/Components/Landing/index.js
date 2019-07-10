import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Modal from "./Modal";
import Snackbar from "./Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import Hidden from "@material-ui/core/Hidden";
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
        <Hidden smUp>
          <div className={classes.logo}>
            <img src="/images/Logo.svg" alt="" />
          </div>
        </Hidden>
        <Hidden smDown>
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
        </Hidden>
        <div className={classes.contetWelcome}>
          <Grid
            container
            spacing={4}
            alignItems="center"
            direction="row"
            className={classes.container}
            justify="center"
          >
            <Grid item xs={12} md={6}>
              <div className={classes.textblock}>
                <h2 className={classes.h2}>
                  Упрости себе <span className={classes.highlight}>жизнь</span>
                </h2>
                <h3 className={classes.h3}>
                  Организовывай распорядок дня с помощью{" "}
                  <span className={classes.highlight}>ToDoApp</span>
                </h3>
                <Modal buttonName="Подробнее" marginTop={30} />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={classes.imgblock}>
                <img
                  src="/images/1FreeMemory.svg"
                  alt="ToDoApp memory"
                  width="100%"
                />
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
          <Hidden smDown>
            <Grid item xs={12} md={6}>
              <div className={classes.imgblock}>
                <img
                  src="/images/2DoMore.svg"
                  alt="FluentCRM Deal"
                  width="100%"
                />
              </div>
            </Grid>
          </Hidden>
          <Grid item xs={12} md={6}>
            <div className={classes.textblock}>
              <h2 className={classes.h2}>
                Освободи себе <span className={classes.highlight}>память</span>
              </h2>
              <h3 className={classes.h3}>
                Записывай важные и не очень задачи в{" "}
                <span className={classes.highlight}>ToDoApp</span>
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
          <Grid item xs={12} md={6}>
            <div className={classes.textblock}>
              <h2 className={classes.h2}>
                <span className={classes.highlight}>Безопасное</span> хранение
                данныех
              </h2>
              <h3 className={classes.h3}>
                Будь уверен в безопасности своих данных
              </h3>
              <Modal buttonName="Подробнее" marginTop={30} />
            </div>
          </Grid>
          <Hidden smDown>
            <Grid item xs={12} md={6}>
              <div className={classes.imgblock}>
                <img
                  src="/images/3EasierLife.svg"
                  alt="FluentCRM Deal"
                  width="100%"
                />
              </div>
            </Grid>
          </Hidden>
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
          <Grid item xs={12} md={6}>
            <div className={classes.imgblock}>
              <img
                src="/images/4Matrix.svg"
                alt="FluentCRM CoopImage"
                width="100%"
              />
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className={classes.textblock}>
              <h2 className={classes.h2}>
                Успевайте за день{" "}
                <span className={classes.highlight}>больше </span>
              </h2>
              <h3 className={classes.h3}>
                Матрица
                <span className={classes.highlight}>Эйзенхауэра </span>
                {"-"}
                эффективный инструмент тайм-менеджмента
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
          <Grid item xs={12} md={6}>
            <div className={classes.textblock}>
              <h2 className={classes.h2}>
                Используйте <span className={classes.highlight}>везде</span>
              </h2>
              <h3 className={classes.h3}>
                <span className={classes.highlight}> ToDoApp</span> доступен на
                любом устройстве с выходом в интернет
              </h3>
              <Modal buttonName="Подробнее" marginTop={30} />
            </div>
          </Grid>
          <Hidden smDown>
            <Grid item xs={12} md={6}>
              <div className={classes.imgblock}>
                <img
                  src="/images/5Devices.svg"
                  alt="FluentCRM Deal"
                  width="100%"
                />
              </div>
            </Grid>
          </Hidden>
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
          <Grid item xs={12} md={6}>
            <div className={classes.imgblock}>
              <img
                src="/images/Payment.svg"
                alt="FluentCRM CoopImage"
                width="100%"
              />
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className={classes.textblock}>
              <h2 className={classes.h2}>
                Совершенно <span className={classes.highlight}>бесплатно</span>
              </h2>
              <h3 className={classes.h3}>
                Нет скрытых платежей и платных функций
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
          <Grid item xs={12} md={6}>
            <div className={classes.textblock}>
              <h2 className={classes.h2}>
                Будем рады Вашей{" "}
                <span className={classes.highlight}>помощи</span>!
              </h2>
              <h3 className={classes.h3}>
                Если Вам нравится наше приложение, Вы можете поддержать нас
                материально на будущее развитие
              </h3>
              <form
                method="POST"
                action="https://money.yandex.ru/quickpay/confirm.xml"
                className={classes.form}
                noValidate
                autoComplete="off"
              >
                <input type="hidden" name="receiver" value="41001525987684" />
                <input type="hidden" name="formcomment" value="ToDoApp" />
                <input type="hidden" name="short-dest" value="ToDoApp" />
                <input type="hidden" name="label" value="" />
                <input type="hidden" name="quickpay-form" value="donate" />
                <input type="hidden" name="targets" value="транзакция" />
                <TextField
                  id="comment"
                  label="Комментарий"
                  className={classes.textField}
                  margin="normal"
                  name="comment"
                />
                <TextField
                  id="sum"
                  label="Сумма"
                  name="sum"
                  className={classes.textField}
                  margin="normal"
                  type="number"
                />
                <input type="hidden" name="need-fio" value="false" />
                <input type="hidden" name="need-email" value="false" />
                <input type="hidden" name="need-phone" value="false" />
                <input type="hidden" name="need-address" value="false" />
                <input type="hidden" name="paymentType" value="AC" />
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.pageButton}
                  type="submit"
                >
                  Перевести
                </Button>
              </form>
            </div>
          </Grid>
          <Hidden smDown>
            <Grid item xs={6}>
              <div className={classes.imgblock}>
                <img
                  src="/images/7ContactUs.svg"
                  alt="FluentCRM Deal"
                  width="100%"
                />
              </div>
            </Grid>
          </Hidden>
        </Grid>
      </div>
    </React.Fragment>
  );
};
