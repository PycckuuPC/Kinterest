import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import OneFriend from './OneFriend';

export default function MyFriends(): JSX.Element {
  const friends = useAppSelector((store) => store.subscribers.idolAndFollow);
  const user = useAppSelector((store) => store.user);

  return friends.map((friend) => <OneFriend friend={friend} />);
}
