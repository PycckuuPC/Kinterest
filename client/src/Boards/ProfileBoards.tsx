import { Avatar, Button, FormControl, Input, InputLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changeUserThunk, getUserThunk, setUser } from '../../redux/slices/userSlice';
import OneBoard from './OneBoard';
import { getAllBoardsThunk } from '../../redux/slices/movieSlice';
import { getUserAllThunk } from '../../redux/slices/commentSlice';
import Subscribers from '../Subscribers/Subscribers';
import Banner from '../Video/Banner';

export default function ProfileBoards(): JSX.Element {
  const location = useLocation();

  const users = useAppSelector((store) => store.comment.user);
  const param = useParams();
  const boardsUser = useAppSelector((store) =>
    store.movie.board?.filter((el) => el.user_id === +param?.id),
  );
  const findBoard = useAppSelector((store) =>
    store.movie.board?.find((el) => el.id === +param?.id),
  );
  const user = users.find((user) => user.id === findBoard?.user_id);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // if (location.pathname === '/') {
    dispatch(getUserAllThunk());
    dispatch(getAllBoardsThunk());
  }, []);

  return (
    <>
      <Banner />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '50px',
          marginRight: '80px',
        }}
      >
        <div
          className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 bg-gray-50 text-gray-800"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src={`http://localhost:3002/img/${user?.img}`}
            alt=""
            className="w-32 h-32 mx-auto rounded-full bg-gray-500 aspect-square"
            style={{ objectFit: 'cover', borderRadius: '50%' }}
          />
          <div className="space-y-4 text-center divide-y divide-gray-300">
            <div className="my-2 space-y-1">
              <h2 className="text-xl font-semibold sm:text-2xl">{user?.name}</h2>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'start',
          flexWrap: 'wrap',
        }}
      >
        {location.pathname.includes('profile') &&
          boardsUser?.map((el) => (
            <OneBoard key={`profile${el.id}${el.board_name}`} board={el} movies={el.movies} />
          ))}
      </div>
    </>
  );
}
