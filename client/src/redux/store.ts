import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import movieReducer from './slices/movieSlice';
import commentReducer from './slices/commentSlice';
import subAndSubReduser from './slices/subAndSubSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    movie: movieReducer,
    comment: commentReducer,
    subscribers: subAndSubReduser,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
