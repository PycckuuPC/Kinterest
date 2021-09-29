import type { UserType } from './userTypes';

export type UserSignUpFormType = Omit<UserType, 'id'>;

export type UserLoginFormType = Omit<UserSignUpFormType, 'name'>;

export type BoardFormType = {
  board_name: string;
  about: string;
  private: boolean;
};

export type UserChangeType = {
  name: string;
  img: string;
};
