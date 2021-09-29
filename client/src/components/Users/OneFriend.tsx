import React from 'react';
import { useAppSelector } from '../../redux/hooks';

export default function OneFriend({ friend }): JSX.Element {
  const user = useAppSelector((store) => store.user);

  return <div>OneFriend</div>;
}
