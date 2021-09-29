import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import SliderMain from '../Slider/SliderMain';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logoutThunk } from '../../redux/slices/userSlice';
import '../../styles.css';
import CreateBoardBox from '../Boards/CreateBoardBox';

function VideoNav(): JSX.Element {
  const dispatch = useAppDispatch();
  const logoutHandler = (): void => {
    dispatch(logoutThunk());
  };
  const user = useAppSelector((store) => store.user);

  return (
    // контейнер для бара с видео
    <div className="intro">
      <div className="video">
        <video className="video_media" autoPlay muted loop>
          <source src="./-16224.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="container">
        {/* //контейнер для текста на main */}
        <div className="intro_contentText">
          <div className="textBar">
            <div className="py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                  <h3 className="text-4xl font-bold leading-10 tracking-tight text-white sm:text-5xl sm:leading-none md:text-6xl">
                    Welcome to
                  </h3>
                  <h3 className="text-4xl font-bold leading-10 tracking-tight text-white sm:text-5xl sm:leading-none md:text-6xl">
                    Кинтерест
                  </h3>
                  <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-300 sm:mt-4">
                    Добро пожаловать на наш сайт, посвященный миру кино! Здесь вы найдете все, что
                    нужно для уютного вечера за просмотром любимых фильмов. Наша коллекция включает
                    в себя шедевры разных жанров и эпох, от классических кинолент до самых
                    современных блокбастеров.
                  </p>
                  <div className="mt-10 flex justify-center space-x-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* конец */}

      {/* // контейнер для навигации */}
      <div className="intro_contentNav">
        <div className="conteinerMainNavButton">
          {user.id && (
            <>
              <button type="button" className="butNav">
                <Link to="/">главная</Link>
              </button>

              <button type="button" className="butNav">
                <Link to="/myboards">мои киноборды</Link>
              </button>

              <button type="button" className="butNav">
                <Link to="/favourites">избранное</Link>
              </button>
              <button type="button" className="butNav">
                {' '}
                <Link to="/" onClick={logoutHandler}>
                  выйти
                </Link>
              </button>
            </>
          )}
          {!user.id && (
            <button type="button" className="butNav">
              <Link to="/signin">войти</Link>
            </button>
          )}
        </div>

        {/* конец */}
      </div>
    </div>
  );
}

export default VideoNav;
