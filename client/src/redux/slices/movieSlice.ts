import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AppThunk } from '../hooks';
import type { MovieType } from '../types/movieTypes';
import type { BoardsAndMoviesType, BoardType, FavouriteType } from '../types/boardTypes';
import type { BoardFormType } from '../types/reduxTypes';
import type { UserType } from '../types/userTypes';

type InitialState = {
  movie: MovieType[];
  board: BoardType[];
  favourite: BoardType[];
  myBoard: BoardType[];
  boardsAndMovies: BoardsAndMoviesType[];
};

const initialState: InitialState = {
  movie: [],
  board: [],
  favourite: [],
  myBoard: [],
  boardsAndMovies: [],
  likes: [],
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<MovieType[]>) => ({ ...state, movie: action.payload }),
    addMovies: (state, action: PayloadAction<BoardType[]>) => ({
      ...state,
      movie: [
        ...state.movie,
        ...action.payload.filter((el) => state.movie.every((mov) => mov.id !== el.id)),
      ],
    }),
    setBoards: (state, action: PayloadAction<BoardType[]>) => ({ ...state, board: action.payload }),
    addBoard: (state, action: PayloadAction<BoardType>) => {
      console.log({ payload: action.payload });
      return {
        ...state,
        board: [action.payload],
      };
    },
    deleteBoard: (state, action: PayloadAction<number>) => ({
      ...state,
      board: state.board.filter((el) => el.id !== action.payload),
      myBoard: state.myBoard.filter((el) => el.id !== action.payload),
    }),
    editBoard: (state, action: PayloadAction<BoardType>) => ({
      ...state,
      board: state.board.map((el) => {
        if (el.id === action.payload.id) return action.payload;
        return el;
      }),
    }),
    getMyBoards: (state, action: PayloadAction<number>) => ({
      ...state,
      myBoard: state.board.filter((el) => el.user_id === action.payload),
    }),

    setMyBoards: (state, action: PayloadAction<BoardType[]>) => ({
      ...state,
      myBoard: action.payload,
    }),

    setFavourite: (state, action: PayloadAction<BoardType[]>) => ({
      ...state,
      favourite: action.payload,
    }),

    addFavourite: (state, action: PayloadAction<BoardType>) => ({
      ...state,
      favourite: [...state.favourite, action.payload],
    }),

    setBoardsAndMovies: (state, action: PayloadAction<BoardsAndMoviesType[]>) => ({
      ...state,
      boardsAndMovies: action.payload,
    }),

    deleteFavourite: (state, action: PayloadAction<number>) => ({
      ...state,
      favourite: state.favourite.filter((el) => el.id !== action.payload),
    }),

    setLikes: (state, action: PayloadAction<BoardType[]>) => ({
      ...state,
      likes: action.payload,
    }),

    updateLikes: (state, action: PayloadAction<BoardType>) => ({
      ...state,
      board: state.board.map((el) =>
        el.id === action.payload.dash.id
          ? { ...action.payload.dash, movies: JSON.parse(action.payload.dash.movies) }
          : el,
      ),
      favorite: state.favourite.map((el) =>
        el.id === action.payload.dash.id
          ? { ...action.payload.dash, movies: JSON.parse(action.payload.dash.movies) }
          : el,
      ),
      likes: action.payload.dashAndLikes,
    }),
  },
});

export const {
  setMovies,
  addMovies,
  setBoards,
  addBoard,
  deleteBoard,
  editBoard,
  getMyBoards,
  setMyBoards,
  setFavourite,
  addFavourite,
  deleteFavourite,
  setBoardsAndMovies,
  setLikes,
  updateLikes,
} = movieSlice.actions;

export const getMoviesThunk =
  (page = 1): AppThunk =>
  (dispatch) => {
    axios<MovieType[]>(
      `https://api.themoviedb.org/3/discover/movie?api_key=377930f8839394f83534a7acc12c5ae3&language=ru-RU&region=RU&sort_by=release_date.desc&include_adult=false&include_video=false&page=${page}&vote_count.gte=1000&with_watch_monetization_types=flatrate/`,
      { withCredentials: false },
    )
      .then(({ data }) => dispatch(setMovies(data.results)))
      .catch(console.log);
  };

export const addMoviesThunk =
  (page: number): AppThunk =>
  (dispatch) => {
    axios<MovieType[]>(
      `https://api.themoviedb.org/3/discover/movie?api_key=377930f8839394f83534a7acc12c5ae3&language=ru-RU&region=RU&sort_by=release_date.desc&include_adult=false&include_video=false&page=${page}&vote_count.gte=1000&with_watch_monetization_types=flatrate/`,
      { withCredentials: false },
    )
      .then(({ data }) => dispatch(addMovies(data.results)))
      .catch(console.log);
  };

export const getBoardsThunk = (): AppThunk => (dispatch) => {
  axios<BoardType[]>('/api/dashboards/top')
    .then(({ data }) =>
      dispatch(setBoards(data.map((el) => ({ ...el, movies: JSON.parse(el.movies) })))),
    )
    .catch(console.log);
};

export const getAllBoardsThunk = (): AppThunk => (dispatch) => {
  axios<BoardType[]>('/api/dashboards/all')
    .then(({ data }) =>
      dispatch(setBoards(data.map((el) => ({ ...el, movies: JSON.parse(el.movies) })))),
    )
    .catch(console.log);
};

export const getMyBoardsThunk = (): AppThunk => (dispatch) => {
  axios<BoardType[]>('/api/dashboards/my') // Ручка на сервере!!!!!!!!!
    .then(({ data }) =>
      dispatch(setMyBoards(data.map((el) => ({ ...el, movies: JSON.parse(el.movies) })))),
    )
    .catch(console.log);
};

export const getLikesThunk = (): AppThunk => (dispatch) => {
  axios<BoardType[]>('/api/dashboards/likes')
    .then(({ data }) => dispatch(setLikes(data)))
    .catch(console.log);
};

export const setLikesThunk =
  (boardId: number): AppThunk =>
  (dispatch) => {
    axios
      .post<BoardType['id']>('/api/dashboards/like', { id: boardId })
      .then(({ data }) => dispatch(updateLikes(data)))
      // .then(({ data }) => console.log(data))
      .catch(console.log);
  };

export const addBoardThunk =
  (board: BoardFormType): AppThunk =>
  (dispatch) => {
    axios
      .post<BoardType>('/api/dashboards/new', board)
      .then(({ data }) => dispatch(addBoard(data)))
      // .then(({ data }) => console.log('Slice -> board', data))
      .catch(console.log);
  };

export const deleteBoardThunk =
  (id: number): AppThunk =>
  (dispatch) => {
    axios
      .delete(`/api/dashboards/del/${id}`) // Ручка на сервере!!!!!!!!!
      .then(() => dispatch(deleteBoard(id)))
      .catch(console.log);
  };

export const editBoardThunk =
  (id: number, board: BoardFormType): AppThunk =>
  (dispatch) => {
    axios
      .patch<BoardType>(`/api/dashboards/edit/${id}`, board) // Ручка на сервере!!!!!!!!!
      .then(({ data }) => {
        dispatch(editBoard(data.map((el) => ({ ...el, movies: JSON.parse(el.movies) }))));
        console.log({ response: data });
      })
      .catch(console.log);
  };

export const getFavouriteThunk = (): AppThunk => (dispatch) => {
  axios<BoardType[]>('/api/dashboards/favourite/')
    .then(({ data }) => {
      dispatch(setFavourite(data.map((el) => ({ ...el, movies: JSON.parse(el.movies) }))));
    })
    .catch(console.log);
};

export const getBoardsAndMoviesThunk = (): AppThunk => (dispatch) => {
  axios<BoardsAndMoviesType[]>('/api/dashboards/movies')
    .then(({ data }) => dispatch(setBoardsAndMovies(data)))
    .catch(console.log);
};

export const addFavouriteThunk =
  (board: BoardType): AppThunk =>
  (dispatch) => {
    axios
      .post<BoardType>(`/api/dashboards/favourite/${board.id}`)
      .then(({ data }) => dispatch(addFavourite(data)))
      .catch(console.log);
  };

export const deleteFavouriteThunk =
  (id: number): AppThunk =>
  (dispatch) => {
    axios
      .delete(`/api/dashboards/favourite/${id}`)
      .then(() => dispatch(deleteFavourite(id)))
      .catch(console.log);
  };

export default movieSlice.reducer;
