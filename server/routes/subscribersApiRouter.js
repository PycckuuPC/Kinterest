const express = require('express');
const { SubAndSub, User } = require('../db/models');

const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    const { idol_id, following_id } = req.body;
    if (idol_id === following_id) {
      return res.status(400);
    }

    const data = await SubAndSub.findOrCreate({
      where: { idol_id, following_id },
    });
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await SubAndSub.findAll({ include: User });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
