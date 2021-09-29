import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthPage from './components/Auth';
import MainPage from './components/MainPage';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { checkAuthThunk } from './redux/slices/userSlice';
import BoardContent from './components/Boards/BoardIntro/BoardContent';
import AddBoard from './components/Boards/AddBoard';
import EditBoard from './components/Boards/EditBoard';
import AllBoards from './components/Boards/AllBoards';
import FriendsPage from './components/Users/FriendsPage';
import ProfileBoards from './components/Boards/ProfileBoards';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthThunk());
  }, []);

  const user = useAppSelector((store) => store.user);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      {!user.name && <Route path="/:auth" element={<AuthPage />} />}
      <Route path="/myboards" element={<AllBoards />} />
      <Route path="/profile/:id" element={<ProfileBoards />} />
      <Route path="/boards/:id" element={<BoardContent />} />
      <Route path="/boards/edit/:id" element={<EditBoard />} />
      <Route path="/addBoard" element={<AddBoard />} />
      <Route path="/favourites" element={<AllBoards />} />
      <Route path="/friends" element={<FriendsPage />} />
    </Routes>
  );
}

export default App;
