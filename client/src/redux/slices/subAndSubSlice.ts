import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AppThunk } from '../hooks';
import type { IdolAndFollow } from '../types/idolAndFollow';

type InitialState = {
  idolAndFollow: IdolAndFollow[];
};

const initialState: InitialState = {
  idolAndFollow: [],
};

export const subAndSubSlice = createSlice({
  name: 'sub',
  initialState,
  reducers: {
    setSub: (state, action: PayloadAction<IdolAndFollow[]>) => ({
      ...state,
      idolAndFollow: action.payload,
    }),

    addSub: (state, action: PayloadAction<IdolAndFollow>) => ({
      ...state,
      idolAndFollow: [action.payload, ...state.idolAndFollow],
    }),
  },
});

export const { setSub, addSub } = subAndSubSlice.actions;

export const getSubThunk = (): AppThunk => (dispatch) => {
  axios<IdolAndFollow[]>('/api/sub')
    .then(({ data }) => dispatch(setSub(data)))
    .catch(console.log);
};

export const addSubThunk =
  (idol_id: number, following_id: number): AppThunk =>
  (dispatch) => {
    axios
      .post<IdolAndFollow>('/api/sub/add', { idol_id, following_id })
      .then(({ data }) => {
        dispatch(addSub(data));
        console.log({ data });
      })

      .catch(console.log);
  };

export default subAndSubSlice.reducer;
