import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '200px',
    margin: '10px',
  },
  media: {
    height: 240,
  },
  modal: {},
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '50%', // здесь можно задать фиксированную ширину модального окна
  },
}));

export default function EditOneFilm({ movies }): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    getData(movies);
  }, []);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  async function getData(movies) {
    const obj = await axios(
      `https://api.themoviedb.org/3/movie/${movies.movie_id}?api_key=377930f8839394f83534a7acc12c5ae3&language=ru-RU`,
      { withCredentials: false },
    );

    setMovieData(obj.data);
  }

  if (!movieData) {
    return null;
  }

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea onClick={handleOpen}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
            alt="image1"
            width="100%"
            height="240"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {movieData.title}
            </Typography>

            <Typography variant="body2" color="textSecondary" component="p">
              Дата выхода: {movieData.release_date}
            </Typography>

            <Typography variant="body2" color="textSecondary" component="p">
              Бюджет: {movieData.budget}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Рейтинг: {movieData.vote_average}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button onClick={handleOpen} size="small" color="primary">
            Подробнее
          </Button>
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
          <div className={classes.paper}>
            <Typography variant="h4" gutterBottom>
              {movieData.title}
            </Typography>
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
              alt={movieData.title}
              style={{ height: '400px' }}
            />
            <Typography variant="body2" gutterBottom>
              {movieData.overview}
            </Typography>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
