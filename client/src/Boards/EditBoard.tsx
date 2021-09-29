import React, { useEffect, useState } from 'react';
import { TextField, Checkbox, FormControlLabel, Button } from '@material-ui/core';
import '../../styles.css';
import { Box } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import {
  addMoviesThunk,
  editBoardThunk,
  getAllBoardsThunk,
  getMoviesThunk,
} from '../../redux/slices/movieSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import AddOneFilm from './AddOneFilm';
import type { MovieType } from '../../redux/types/movieTypes';
import OneFilmMini from './OneFilmMini';
import Banner from '../Video/Banner';

export default function EditBoard(): JSX.Element {
  const { id } = useParams();
  const board = useAppSelector((store) =>
    store.movie.myBoard.find((el) => {
      if (el.id === +id) return el;
    }),
  );

  const films = useAppSelector((store) => store.movie.movie);
  const user_id = useAppSelector((store) => store.user.id);
  const [addedMovies, setAddedMovies] = useState([...board.movies]);
  const [findedMovies, setFindedMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState(board.private);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllBoardsThunk());
    dispatch(getMoviesThunk(page));
  }, []);

  const deleteHandler = (film) => {
    setAddedMovies((prev) => prev.filter((el) => el.id !== film.id));
  };

  const addHandler = (film) => {
    if (addedMovies.every((el) => el.id !== film.id))
      setAddedMovies((prev) => [...prev, { ...film, add: false, deleteHandler }]);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      axios<MovieType[]>(
        `https://api.themoviedb.org/3/search/movie?api_key=377930f8839394f83534a7acc12c5ae3&language=ru-Ru&query=${input}&page=1&include_adult=false`,
        { withCredentials: false },
      )
        .then(({ data }) => setFindedMovies(data.results))
        .catch(console.log);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [input]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = Object.fromEntries(new FormData(e.currentTarget));
    dispatch(
      editBoardThunk(board.id, {
        ...form,
        private: checked,
        user_id,
        movies: addedMovies,
      }),
    );
    setTimeout(() => navigate('/myboards'), 500);
  };

  const fetchMoreData = () => {
    dispatch(addMoviesThunk(page));
    setTimeout(() => {
      setPage((prev) => prev + 1);
    }, 200);
  };

  return (
    <>
      <Banner />
      <div className="flexAddd">
        <div className="AddContainerForm">
          <form className="form" onSubmit={submitHandler}>
            <TextField
              defaultValue={board.board_name}
              name="board_name"
              label="Название доски"
              required
            />
            <TextField defaultValue={board.about} name="about" label="Описание доски" required />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  name="private"
                  color="primary"
                />
              }
              label="Приватная доска"
            />
            <div className="containerForFilm">
              {addedMovies?.map((el) => (
                <OneFilmMini key={el.id} film={{ ...el, deleteHandler }} />
              ))}
            </div>
            <Button type="submit" variant="contained" color="primary">
              Сохранить
            </Button>
          </form>
          <div className="AddContainerFilm">
            <h1 className="textForAdd">Добавить фильм</h1>
            <Box
              sx={{
                width: 500,
                maxWidth: '100%',
              }}
            >
              <TextField
                fullWidth
                label="Поиск по названию"
                id="fullWidth"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
            </Box>
          </div>
        </div>
        <div className="containerForFilm">
          {input.length > 0 ? (
            findedMovies.map(
              (el) =>
                el.vote_count > 500 && (
                  <AddOneFilm key={el.id} film={{ ...el, add: true, addHandler }} />
                ),
            )
          ) : (
            <InfiniteScroll
              pageStart={1}
              loadMore={fetchMoreData}
              hasMore={true || false}
              loader={
                <h2 style={{ textAlign: 'center' }} className="loader" key="infScrollLoading">
                  Загрузка ...
                </h2>
              }
            >
              <div className="containerForFilm">
                {films.map((el) => (
                  <AddOneFilm key={el.id} film={{ ...el, add: true, addHandler }} />
                ))}
              </div>
            </InfiniteScroll>
          )}
        </div>
      </div>
    </>
  );
}
