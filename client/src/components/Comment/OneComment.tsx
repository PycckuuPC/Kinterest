import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import type { UserType } from '../../redux/types/userTypes';
import type { CommentType } from '../../redux/types/commentType';

const useStyles = makeStyles({
  root: {
    width: 250,
    height: '100%',
    marginBottom: '1rem',
  },
  media: {
    width: '100%',
    height: 0,
    paddingTop: '100%',
    objectFit: 'cover',
  },
  content: {
    width: '100%',
  },
});

type Props = {
  comment: CommentType;
  user: UserType;
};

export default function OneComment({ comment, user }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <div className="container flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md divide-gray-300 bg-gray-50 text-gray-800 m-4">
      <div className="flex flex-wrap justify-between p-4">
        <div className="flex space-x-4">
          <div>
            <img
              src={`http://localhost:3002/img/${user?.img}`}
              alt=""
              className="object-cover w-12 h-12 rounded-full bg-gray-500"
            />
          </div>
          <div className=" flex ">
            {' '}
            <p>Автор: </p>
            <h4 className="font-bold">{'\u00A0'} {user?.name}</h4>
          </div>
        </div>
        <div className="flex flex-start p-4 space-y-2 text-sm text-gray-600">
          <p>{comment.comment}</p>
        </div>
      </div>
    </div>
  );
}
