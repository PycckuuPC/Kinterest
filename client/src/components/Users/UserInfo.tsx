import { Avatar, Button, FormControl, Input } from '@mui/material';
import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changeUserThunk, setUser } from '../../redux/slices/userSlice';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UserInfo(): JSX.Element {
  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const [open, setOpen] = React.useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const [name, setName] = useState(user?.name);

  const changeUserHandler = (e): void => {
    e.preventDefault();
    dispatch(changeUserThunk(Object.fromEntries(new FormData(e.currentTarget)), user.id));
  };

  return (
    <>
      <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 bg-gray-50 text-gray-800">
        {user?.img ? (
          <img
            className="w-32 h-32 mx-auto rounded-full bg-gray-500 aspect-square"
            src={`http://localhost:3002/img/${user?.img}`}
            style={{ objectFit: 'cover', borderRadius: '50%' }}
            alt=""
          />
        ) : (
          <img
            className="w-32 h-32 mx-auto rounded-full bg-gray-500 aspect-square"
            src="/img/user_icon.png"
            style={{ objectFit: 'cover', borderRadius: '50%' }}
            alt=""
          />
        )}
        <div className="space-y-4 text-center divide-y divide-gray-300">
          <div className="my-2 space-y-1">
            <h2 className="text-xl font-semibold sm:text-2xl">{user?.name}</h2>
          </div>
          {user?.id && (
            <Button variant="text" type="button" onClick={handleOpen}>
              Изменить профиль
            </Button>
          )}
        </div>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Измените данные профиля
            </Typography>
            <Box sx={{ mt: 4 }}>
              <form onSubmit={(e) => changeUserHandler(e)}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Input id="avatar" name="avatar" type="file" />
                </FormControl>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="contained" color="primary" type="submit">
                    Сохранить
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
