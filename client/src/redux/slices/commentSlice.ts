import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AppThunk } from '../hooks';
import type { CommentType } from '../types/commentType';
import type { UserType } from '../types/userTypes';

type InitialState = {
  comment: CommentType[];
  user: UserType[];
};

const initialState: InitialState = {
  comment: [],
  user: [],
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setComment: (state, action: PayloadAction<CommentType[]>) => ({
      ...state,
      comment: action.payload,
    }),

    setUserAll: (state, action: PayloadAction<UserType[]>) => ({ ...state, user: action.payload }),

    deleteComment: (state, action: PayloadAction<number>) => ({
      ...state,
      comment: state.comment.filter((el) => el.id !== action.payload),
    }),

    addComment: (state, action: PayloadAction<CommentType>) => ({
      ...state,
      comment: [action.payload, ...state.comment],
    }),
  },
});

export const { setComment, deleteComment, addComment, setUserAll } = commentSlice.actions;

export const getCommentThunk = (): AppThunk => (dispatch) => {
  axios<CommentType[]>('/api/comment')
    .then(({ data }) => dispatch(setComment(data)))
    .catch(console.log);
};

export const getUserAllThunk = (): AppThunk => (dispatch) => {
  axios<UserType[]>('/api/comment/user')
    .then(({ data }) => dispatch(setUserAll(data)))
    .catch(console.log);
};

export const addCommentThunk =
  (board_id: number, user_id: number, comment: string): AppThunk =>
  (dispatch) => {
    axios
      .post<CommentType>('/api/comment', { board_id, user_id, comment })
      .then(({ data }) => dispatch(addComment(data)))

      .catch(console.log);
  };

export const deleteCommentThunk =
  (id: number): AppThunk =>
  (dispatch) => {
    axios
      .delete(`/api/`)
      .then(() => dispatch(deleteComment(id)))
      .catch(console.log);
  };

export default commentSlice.reducer;
