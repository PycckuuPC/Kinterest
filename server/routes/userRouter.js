const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../db/models');
const fileMiddleware = require('./middleware/file');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, name, password } = req.body;
  if (email && name && password) {
    try {
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: { name, password: await bcrypt.hash(password, 7) },
      });
      if (!created) {
        return res
          .status(401)
          .json(
            'Пользователь с таким именем уже зарегистрирован, создайте новый профиль'
          );
      }

      const sessionUser = JSON.parse(JSON.stringify(user));
      delete sessionUser.password;
      req.session.user = sessionUser;
      return res.json(sessionUser);
    } catch (e) {
      return res.status(500).json('Ошибка регистрации, попробуйте заново');
    }
  }
  return res.status(500).json('Для регистрации заполните все поля формы');
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    try {
      const user = await User.findOne({
        where: { email },
      });
      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(401).json('Неверно введен пароль');
      }

      const sessionUser = JSON.parse(JSON.stringify(user));
      delete sessionUser.password;
      req.session.user = sessionUser;
      console.log(sessionUser);
      return res.json(sessionUser);
    } catch (e) {
      return res
        .status(500)
        .json('Такой пользователь не был зарегистрирован ранее.');
    }
  }
  return res.status(500).json('Заполните полностью поля: e-mail и пароль');
});

router.get('/check', (req, res) => {
  try {
    if (req.session.user) {
      return res.json(req.session.user);
    }
    return res.sendStatus(401);
  } catch (err) {
    console.error(err);
  }
});

router.get('/logout', (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie('sid').sendStatus(200);
  } catch (err) {
    console.error(err);
  }
});

router.patch(
  '/change/:id',
  fileMiddleware.single('avatar'),
  async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      await user.update({
        name: req.body.name,
        img: req.file?.filename ? req.file.filename : user.img,
      });
      const sessionUser = JSON.parse(JSON.stringify(user));
      delete sessionUser.password;
      req.session.user = sessionUser;
      res.json(sessionUser);
    } catch (err) {
      console.error(err);
    }
  }
);

module.exports = router;
