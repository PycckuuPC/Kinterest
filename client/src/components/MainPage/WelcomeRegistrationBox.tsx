import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { loginThunk, signUpThunk } from '../../redux/slices/userSlice';
import type { UserLoginFormType } from '../../redux/types/reduxTypes';

export default function WelcomeRegistrationBox(): JSX.Element {
  const { auth } = useParams();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(loginThunk(Object.fromEntries(new FormData(e.currentTarget)) as UserLoginFormType));
    navigate(`/`);
  };

  return (
    <div className="containerForAuthWindow">
      <section className="p-6 bg-gray-100 text-gray-800 mt-8">
        <div className="container mx-auto mt-8 grid gap-6 text-center lg:grid-cols-2 xl:grid-cols-5">
          <div className="w-full px-6 py-16 rounded-md sm:px-12 md:px-16 xl:col-span-2 bg-gray-50">
            <h1 className="text-5xl font-extrabold text-gray-900">
              Зарегистрируйся, чтобы находить больше идей
            </h1>

            <form onSubmit={submitHandler}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="flex my-2 text-sm">
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
                    placeholder="***"
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
                    Войти
                  </button>
                </div>
                <p className="px-6 text-sm text-center text-gray-600">
                  У вас еще нет аккаунта?
                  <a
                    rel="noopener noreferrer"
                    href="/signup"
                    className="hover:underline text-violet-600"
                  >
                    {'\u00A0'} Зарегистрироваться
                  </a>
                </p>
              </div>
            </form>
          </div>
          <img
            src="banner.jpg"
            alt=""
            className="object-cover w-full rounded-md xl:col-span-3 bg-gray-500"
          />
        </div>
      </section>
    </div>
  );
}
