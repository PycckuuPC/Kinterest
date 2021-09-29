import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  getBoardsAndMoviesThunk,
  getBoardsThunk,
  getFavouriteThunk,
  getLikesThunk,
  getMyBoardsThunk,
  editBoardThunk,
  deleteBoardThunk,
} from '../../redux/slices/movieSlice';
import OneBoard from './OneBoard';
import '../../styles.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import UserInfo from '../Users/UserInfo';
import CreateBoardBox from './CreateBoardBox';
import { getSubThunk } from '../../redux/slices/subAndSubSlice';
import Banner from '../Video/Banner';
import ProfileBoards from './ProfileBoards';
import Subscribers from '../Subscribers/Subscribers';

export default function AllBoards(): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const boards = useAppSelector((store) => store.movie.board);
  const favourites = useAppSelector((store) => store.movie.favourite);
  const boardsAndMovies = useAppSelector((store) => store.movie.boardsAndMovies);
  const boardsUser = useAppSelector((store) => store.movie.myBoard);

  useEffect(() => {
    dispatch(getBoardsThunk());
    dispatch(getBoardsAndMoviesThunk());
    dispatch(getLikesThunk());
    dispatch(getMyBoardsThunk());
    dispatch(getFavouriteThunk());
    dispatch(getSubThunk());
  }, []);

  const deleteHandler = (id: number) => {
    dispatch(deleteBoardThunk(id));
  };

  const editHandler = (id: number, board: BoardFormType) => {
    dispatch(editBoardThunk(id, board)); // для редактирования доски
  };

  return (
    <>
      {location.pathname === '/' ? (
        <div
          className="containerAllBoard"
          style={{
            backgroundColor: 'rgb(31, 36, 46)',
          }}
        >
          {boards?.map((el) => (
            <OneBoard
              key={`main${el.id}`}
              board={el}
              movies={boardsAndMovies.filter((board) => board.board_id === el.id)}
            />
          ))}
        </div>
      ) : location.pathname === '/myboards' ? (
        <>
          <Banner />
          <div className="divUserInfo">
            <UserInfo />
          </div>
          {/* //для выравнивания кнопок! */}
          <Subscribers />
          <CreateBoardBox />
          <div className="containerAllBoard">
            {boardsUser?.map((el) => (
              <OneBoard
                key={`my${el.id}`}
                board={{ ...el, editHandler, deleteHandler }}
                movies={boardsAndMovies.filter((board) => board.board_id === el.id)}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <Banner />

          <div className="divUserInfo">
            {location.pathname === '/myboards' || location.pathname === '/favourites' ? (
              <UserInfo />
            ) : (
              <ProfileBoards />
            )}
          </div>

          <div
            className="containerAllBoard"
            style={{
              backgroundColor: 'rgb(31, 36, 46)',
            }}
          >
            {favourites?.map((el) => (
              <OneBoard
                key={`main${el.id}`}
                board={el}
                movies={boardsAndMovies.filter((board) => board.board_id === el.id)}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
