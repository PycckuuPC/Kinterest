import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { addSubThunk, getSubThunk } from '../../redux/slices/subAndSubSlice';
import { getBoardsThunk } from '../../redux/slices/movieSlice';
import { getUserAllThunk } from '../../redux/slices/commentSlice';
import OneFollower from './OneFollower';

export default function Subscribers() {
  const param = useParams();
  const dispatch = useAppDispatch();
  const [sub, setSub] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalUser, setmodalUser] = useState(false);
  const location = useLocation();

  useEffect(() => {
    dispatch(getSubThunk());
    dispatch(getBoardsThunk()); // передаем в диспатч функцию для получения всех досок
    dispatch(getUserAllThunk()); // получаем всех юзеров
  }, []);

  const board = useAppSelector((store) => store?.movie?.board).find(
    (board) => board?.id === Number(param.id),
  ); // ищу текущую доску(в которой нахожусь), чтобы потом достать из неё user_id
  // владеющего данной доской, это и будет тот на которого
  // подписался текущий юзер из сессии(вошедший на сайт)

  const user = useAppSelector((store) => store.user);

  const subscribers = useAppSelector((store) => store.subscribers.idolAndFollow).filter(
    (subscribers) => board?.user_id === subscribers.idol_id,
  ); // получаем все поля с подписчиками хозяина доски

  const subscribersOurUser = useAppSelector((store) => store.subscribers.idolAndFollow).filter(
    (subscribers) => user?.id === subscribers.idol_id,
  ); // получаем все поля с подписчиками текущего юзера

  const userAll = useAppSelector((store) => store.comment.user); // полуаем всех юзеров

  const addSubHandler = () => {
    dispatch(addSubThunk(board?.user_id, user.id)); // кладем сюда  id-владельца доски, id-текущего юзера
  };

  return (
    <>
      <div className="subscribersContainer">
        <div>
          {board?.user_id !== user.id && location.pathname !== '/myboards' ? (
            <button
              className="flex flex-row bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full butSub"
              variant="contained"
              color="primary"
              onClick={() => addSubHandler()}
            >
              подписаться
            </button>
          ) : (
            <div />
          )}
        </div>
        {/* <div>
          {location.pathname === '/myboards' ? (
            <button
              className="flex flex-row bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full"
              variant="contained"
              color="primary"
              onClick={() => setmodalUser((prev) => !prev)}
            >
              показать подписчиков
            </button>
          ) : (
            <button
              className="flex flex-row bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full"
              variant="contained"
              color="primary"
              onClick={() => setModal((prev) => !prev)}
            >
              показать подписчиков
            </button>
          )}
        </div> */}
      </div>
      {modal ? ( // подписчики чужие, получаем когда на чужой доске
        <div>
          {subscribers?.map((el) => (
            <OneFollower key={el.id} user={userAll?.find((u) => u.id === el.following_id)!} />
          ))}
        </div>
      ) : (
        <div />
      )}

      {modalUser ? ( // подписчики чужие, получаем когда на myBoard
        <div>
          {subscribersOurUser?.map((el) => (
            <OneFollower key={el.id} user={userAll?.find((u) => u.id === el.following_id)!} />
          ))}
        </div>
      ) : (
        <div />
      )}
    </>
  );
}
