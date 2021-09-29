import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getUserAllThunk } from '../../redux/slices/commentSlice';

export default function Search(): JSX.Element {
  const users = useAppSelector((store) => store.comment.user);
  const [input, setInput] = useState('');
  const [findedUsers, setFindedUsers] = useState([]);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserAllThunk());
  }, []);

  return (
    <div className=" w-full flex justify-center mt-8">
      <div className=" w-1/2 inline-flex flex-col justify-center relative text-gray-500">
        <div className="w-full -mb-1">
          <input
            type="text"
            className="w-full p-2 pl-8 rounded border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
            placeholder="Найти пользователя..."
            onChange={(e) => {
              setInput(e.target.value);
              setFindedUsers(users.filter((el) => el.name.includes(input)));
            }}
            value={input}
          />
          <svg
            className="w-4 h-4 absolute left-2.5 top-3.5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <ul className="bg-white border border-gray-100 w-full">
          {input.length > 0 &&
            findedUsers?.map((user) => (
              <button
                key={user.id}
                className="items-start w-full"
                type="button"
                onClick={() => navigate(`/profile/${user?.id}`)}
              >
                <li className="flex items-start w-full pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="stroke-current absolute w-4 h-4 left-2 top-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <b className="items-start">{user?.name}</b>
                </li>
              </button>
            ))}
        </ul>
      </div>
    </div>
  );
}
