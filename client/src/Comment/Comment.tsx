import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { addCommentThunk, getCommentThunk, getUserAllThunk } from '../../redux/slices/commentSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import OneComment from './OneComment';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function Comment(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserAllThunk());
  }, []);

  const user = useAppSelector((store) => store.user);

  const param = useParams();
  const userAll = useAppSelector((store) => store.comment.user);

  const comment = useAppSelector((store) => store.comment.comment).filter(
    (el) => el.board_id === Number(param.id),
  );

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [com, setComment] = useState('');

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleCommentChange = (event): void => {
    setComment(event.target.value);
  };

  const addCommentHandler = (): void => {
    dispatch(addCommentThunk(Number(param.id), user.id, com));
    handleClose();
  };

  useEffect(() => {
    dispatch(getUserAllThunk());
    dispatch(getCommentThunk());
  }, []);

  return (
    <div>
      {user.id && (
        <div className="flex flex-row justify-center">
          <button
            type="button"
            className="flex flex-row justify-center bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full"
            variant="contained"
            color="primary"
            onClick={handleOpen}
          >
            оставить комментарий
          </button>
        </div>
      )}

      <div className="comments">
        {comment.map((el) => (
          <div key={el.id}>
            <OneComment comment={el} user={userAll.find((user) => user.id === el.user_id)!} />
          </div>
        ))}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <h2 id="simple-modal-title" className="textCommentModal">
            Оставьте комментарий
          </h2>
          <textarea rows="4" cols="50" value={com} onChange={handleCommentChange} />
          <button
            type="button"
            className="flex flex-row bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full mt-4"
            variant="contained"
            color="primary"
            onClick={() => addCommentHandler()}
          >
            Отправить
          </button>
        </div>
      </Modal>
    </div>
  );
}
