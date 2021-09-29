import React from 'react';
import type { UserType } from '../../redux/types/userTypes';

type Props = {
  user: UserType;
};

export default function OneFollower({ user }: Props): JSX.Element {
  return (
    <div className="subPozish">
      <div className="avatarDiv">
        {user?.img ? (
          <img className="avatar" src={`http://localhost:3002/img/${user?.img}`} alt="" />
        ) : (
          <img className="avatar" src="/img/user_icon.png" alt="" />
        )}
      </div>
      <div className="textSub">{user?.name}</div>
    </div>
  );
}
