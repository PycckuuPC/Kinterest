import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logoutThunk } from '../../redux/slices/userSlice';
import '../../styles.css';

export default function Banner(): JSX.Element {
  const dispatch = useAppDispatch();
  const logoutHandler = (): void => {
    dispatch(logoutThunk());
  };
  const user = useAppSelector((store) => store.user);

  return (
    <div>
      <div className="banner">
        {' '}
        <div className="intro_contentNav">
          <nav>
            <div className="conteinerMainNavButton">
              <button type="button" className="butNav">
                <Link to="/">главная</Link>
              </button>

              {user.id && (
                <>
                  <button type="button" className="butNav">
                    <Link to="/myboards">мои киноборды</Link>
                  </button>

                  <button type="button" className="butNav">
                    <Link to="/favourites">избранное</Link>
                  </button>
                </>
              )}

              {user.id ? (
                <button type="button" className="butNav">
                  {' '}
                  <Link to="/" onClick={logoutHandler}>
                    выйти
                  </Link>
                </button>
              ) : (
                <button type="button" className="butNav">
                  <Link to="/signin">войти</Link>
                </button>
              )}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
