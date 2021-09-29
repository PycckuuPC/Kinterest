import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import MyFriends from './MyFriends';
import UserInfo from './UserInfo';

export default function FriendsPage(): JSX.Element {
  return (
    <>
      <UserInfo />
      <MyFriends />
    </>
  );
}
