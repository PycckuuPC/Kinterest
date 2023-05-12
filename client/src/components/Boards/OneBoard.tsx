import React, { useEffect, useState } from 'react';
// import { useAppDispatch } from '../ redux/store';
// import { deleteBoardThunk, editBoardThunk } from '../ redux/slices/boardsSlice'; //подключаем Thunk для удаления и редактирования
// import { BoardsType } from '../type/BoardsType';
// import type { BoardFormType } from '../type/ReduxTypes';
import { Button, Grid } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import OneMovieImg from './OneMovieImg';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import {
  addFavourite,
  addFavouriteThunk,
  deleteFavouriteThunk,
  getLikesThunk,
  setLikesThunk,
} from '../../redux/slices/movieSlice';
import { getUserAllThunk } from '../../redux/slices/commentSlice';

const handleClick = (id: number) => {
  window.location.href = `/boards/${id}`;
  console.log(window.location.href);
};

function OneBoard({ board, movies }): JSX.Element {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const favourites = useAppSelector((store) => store.movie.favourite);
  const user = useAppSelector((store) => store.user);

  const [fav, setFav] = useState(Boolean(favourites?.find((el) => el.id === board.id)));

  const navigate = useNavigate();

  const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>): void => {
    dispatch(addFavouriteThunk(board));
    setFav((prev) => !prev);
  };

  const deleteFromFavourite = (): void => {
    dispatch(deleteFavouriteThunk(board.id));
    setFav((prev) => !prev);
  };
  const likes = useAppSelector((store) => store.movie.likes);

  useEffect(() => {
    dispatch(getUserAllThunk());
  }, []);

  return (
    <div className="cardBoardContainer">
      <div className="avatarDiv">
        {board?.User?.img ? (
          <img className="avatar" src={`http://localhost:3002/img/${board?.User?.img}`} />
        ) : (
          <img className="avatar" src="/img/user_icon.png" />
        )}
        <div className="avatarText">{board?.User?.name}</div>
      </div>

      <div className="filmCard">
        <div>
          <OneMovieImg
            key={board?.movies?.length && board?.movies[0].id}
            movie={board?.movies?.length && board?.movies[0]}
            header
          />{' '}
        </div>
        <div className="filmCardFlex">
          {board.movies?.slice(1).map((movie) => (
            <div>
              <OneMovieImg key={movie.id} movie={movie} />
            </div>
          ))}
        </div>
      </div>

      <div className="textBoard">
        <div>Название: {board.board_name}</div>
        <div>Описание: {board.about}</div>

        <div className="flex">
          {user.id && user.id !== board.user_id && (
            <button
              type="button"
              className="flex items-center p-1 space-x-1.5"
              onClick={() => {
                dispatch(setLikesThunk(board.id));
              }}
            >
              {likes.some((el) => el.user_id === user.id && el.board_id === board.id) ? (
                <>
                  <FavoriteIcon />
                  <span>{board.count_likes}</span>
                </>
              ) : (
                <>
                  <FavoriteBorderIcon />
                  <span>{board.count_likes}</span>
                </>
              )}
            </button>
          )}
          {user.id &&
            (!fav ? (
              <button
                onClick={addToFavourite}
                aria-label="Bookmark this post"
                type="button"
                className="p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-4 h-4 fill-current text-violet-600"
                >
                  <path d="M424,496H388.75L256.008,381.19,123.467,496H88V16H424ZM120,48V456.667l135.992-117.8L392,456.5V48Z" />
                </svg>
              </button>
            ) : (
              <button
                onClick={deleteFromFavourite}
                aria-label="Bookmark this post"
                type="button"
                className="p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-bookmark-check-fill"
                  viewBox="0 0 16 16"
                >
                  {' '}
                  <path
                    fill-rule="evenodd"
                    d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"
                  />{' '}
                </svg>
              </button>
            ))}
        </div>
      </div>

      <div className="buttonGroup">
        <div className="buttonCard" style={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={() => navigate(`/boards/${board.id}`)}>
            {location.pathname === '/' ? (
              <div>Посмотреть доску</div>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            )}
          </Button>
        </div>
        {location.pathname === '/myboards' && (
          <>
            <Button onClick={() => board.deleteHandler(board.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>
            </Button>
            <Button onClick={() => navigate(`/boards/edit/${board.id}`)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default React.memo(OneBoard);
