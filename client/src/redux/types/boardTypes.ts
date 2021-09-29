import type { UserType } from './userTypes';

export type BoardType = {
  id: number;
  board_name: string;
  about: string;
  private: boolean;
  count_likes: number;
  count_favourite: number;
  user_id: number;
  User: UserType;
};

export type BoardsAndMoviesType = {
  board_id: number;
  movie_id: number;
};

export type FavouriteType = {
  user_id: number;
  board_id: number;
};
