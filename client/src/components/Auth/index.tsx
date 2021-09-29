import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { loginThunk, signUpThunk } from '../../redux/slices/userSlice';
import type { UserLoginFormType, UserSignUpFormType } from '../../redux/types/reduxTypes';

export default function AuthPage(): JSX.Element {
  const { auth } = useParams();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (auth === 'signin') {
      dispatch(loginThunk(Object.fromEntries(new FormData(e.currentTarget)) as UserLoginFormType));
      navigate(`/`);
    } else {
      dispatch(
        signUpThunk(Object.fromEntries(new FormData(e.currentTarget)) as UserSignUpFormType),
      );
      navigate(`/`);
    }
  };

  return (
    <div className="authCont">
      <div
        className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-50 text-gray-800 "
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Войти</h1>
          <p className="text-sm text-gray-600">Добро пожаловать!</p>
        </div>
        <form onSubmit={submitHandler}>
          <div className="space-y-4">
            {auth === 'signup' && (
              <div>
                <label htmlFor="name" className="block mb-2 text-sm">
                  Имя пользователя
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Иван"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Адрес электронной почты
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="ivan@ivanov.com"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">
                  Пароль
                </label>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button
                type="submit"
                className="w-full px-8 py-3 font-semibold rounded-md bg-violet-600 text-gray-50"
              >
                {auth === 'signup' ? 'Зарегистрироваться' : 'Войти'}
              </button>
            </div>
            <p className="px-6 text-sm text-center text-gray-600">
              У вас еще нет аккаунта?
              <a
                rel="noopener noreferrer"
                href="/signup"
                className="hover:underline text-violet-600"
              >
                {'\u00A0'}Зарегистрироваться
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
