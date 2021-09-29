import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import { height } from '@mui/system';
import '../../styles.css';
import OneMovieCard from './OneMovieCard';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '180px',
    margin: '10px',
  },
  media: {
    height: 240,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '70%',
  },
}));

export default function OneFilm({ film }): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea onClick={handleOpen}>
          <CardMedia
            className={classes.media}
            image={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
            title={film.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
              {film.title}
            </Typography>

            <Typography variant="body2" color="textSecondary" component="p">
              Рейтинг IMDb: {film.vote_average}
            </Typography>

            <Typography variant="body2" color="textSecondary" component="p">
              Дата выхода: {film.release_date}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button onClick={handleOpen} size="small" color="primary">
            Подробнее
          </Button>
          {film.add && (
            <Button onClick={() => film.addHandler(film)} size="small" color="primary">
              Добавить
            </Button>
          )}
          {film.add === false && (
            <Button onClick={() => film.deleteHandler(film)} size="small" color="primary">
              Удалить
            </Button>
          )}
        </CardActions>
      </Card>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropProps={{
          timeout: 700,
        }}
      >
        <Fade in={open}>
          <OneMovieCard film={film} />
        </Fade>
      </Modal>
    </>
  );
}
