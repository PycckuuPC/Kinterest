import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import OneFilm from './OneFilm';
import UserInfo from '../../Users/UserInfo';
import { getBoardsAndMoviesThunk } from '../../../redux/slices/movieSlice';
import Comment from '../../Comment/Comment';
import Banner from '../../Video/Banner';
import ProfileBoards from '../ProfileBoards';
import Subscribers from '../../Subscribers/Subscribers';

export default function BoardContent(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoardsAndMoviesThunk());
  }, []);

  const param = useParams();

  const boardsAndMovies = useAppSelector((store) => store.movie.boardsAndMovies).filter(
    (el) => el.board_id === Number(param.id),
  );

  return (
    <>
      <div className="bannerForBoardContent">
        <Banner />
      </div>

      <div className="containerIntroBoard">
        <div className="divUserInfo">
          {location.pathname === '/myboards' ? <UserInfo /> : <ProfileBoards />} <Subscribers />
        </div>

        <div className="containerFilm">
          {boardsAndMovies?.map((movie) => (
            <div key={movie.id}>
              <OneFilm movies={movie} />
            </div>
          ))}
        </div>

        <div className="containerComment">
          <Comment />
        </div>
      </div>
    </>
  );
}
