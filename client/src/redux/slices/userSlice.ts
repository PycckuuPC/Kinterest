import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import type { UserType } from '../types/userTypes';
import type { AppThunk } from '../hooks';
import type { UserChangeType, UserLoginFormType, UserSignUpFormType } from '../types/reduxTypes';

const initialState: UserType = {};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => action.payload,
    changeUser: (state, action: PayloadAction<UserChangeType>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { setUser, changeUser } = userSlice.actions;

export const signUpThunk =
  (inputs: UserSignUpFormType): AppThunk =>
  (dispatch) => {
    axios
      .post<UserType>('/api/user/signup', inputs)
      .then(({ data }) => dispatch(setUser(data)))
      .catch((e) => {
        alert(e.response.data);
      });
  };

export const loginThunk =
  (inputs: UserLoginFormType): AppThunk =>
  (dispatch) => {
    axios
      .post<UserType>('/api/user/signin', inputs)
      .then(({ data }) => dispatch(setUser(data)))
      .catch((e) => {
        alert(e.response.data);
      });
  };

export const logoutThunk = (): AppThunk => (dispatch) => {
  axios('/api/user/logout')
    .then(() => dispatch(setUser({})))
    .catch(console.log);
};

export const checkAuthThunk = (): AppThunk => (dispatch) => {
  axios<UserType>('/api/user/check')
    .then(({ data }) => dispatch(setUser({ ...data })))
    .catch(() => dispatch(setUser({})));
};

export const changeUserThunk =
  (data, id): AppThunk =>
  (dispatch) => {
    axios
      .patch<UserType>(`/api/user/change/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(({ data }) => dispatch(changeUser(data)))
      .catch(console.log);
  };

export default userSlice.reducer;
