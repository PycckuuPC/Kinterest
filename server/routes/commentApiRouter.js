const express = require('express');
const { Comment, User } = require('../db/models');

const router = express.Router();

router.post('/', async (req, res) => {
  const { board_id, user_id, comment } = req.body;
  try {
    const newComment = await Comment.create({
      board_id,
      user_id,
      comment,
    });
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const comments = await Comment.findAll({ include: User });
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/user', async (req, res) => {
  try {
    const user = await User.findAll();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
