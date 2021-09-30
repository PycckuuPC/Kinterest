const express = require('express');
const {
  Dashboard,
  DashboardAndMovie,
  Favourite,
  Like,
  User,
} = require('../db/models');

const router = express.Router();

router.get('/top', async (req, res) => {
  try {
    const dashboards = await Dashboard.findAll({
      where: { private: false },
      order: [['count_likes', 'DESC']],
      attributes: [
        'id',
        'board_name',
        'about',
        'movies',
        'private',
        'count_likes',
        'count_fav',
        'user_id',
      ],
      limit: 20,
      include: [
        {
          model: User,
        },
      ],
    });
    const dashboardIds = dashboards.map(dashboard => dashboard.id);
    const dashboardAndMovies = await DashboardAndMovie.findAll({
      where: { board_id: dashboardIds },
      attributes: ['board_id', 'movie_id'],
    });
    const dashboardMovies = {};
    dashboardAndMovies.forEach(({ board_id, movie_id }) => {
      if (!dashboardMovies[board_id]) {
        dashboardMovies[board_id] = [];
      }
      dashboardMovies[board_id].push(movie_id);
    });
    const dashboardsWithMovies = dashboards.map(dashboard => {
      const movies = dashboardMovies[dashboard.id] || [];
      return {
        ...dashboard.toJSON(),
        movies,
      };
    });
    res.json(dashboards);
  } catch (err) {
    console.log(err);
  }
});

router.get('/all', async (req, res) => {
  try {
    const dashboards = await Dashboard.findAll({
      where: { private: false },
      order: [['count_likes', 'DESC']],
      attributes: [
        'id',
        'board_name',
        'about',
        'movies',
        'private',
        'count_likes',
        'count_fav',
        'user_id',
      ],
    });
    const dashboardIds = dashboards.map(dashboard => dashboard.id);
    const dashboardAndMovies = await DashboardAndMovie.findAll({
      where: { board_id: dashboardIds },
      attributes: ['board_id', 'movie_id'],
    });
    const dashboardMovies = {};
    dashboardAndMovies.forEach(({ board_id, movie_id }) => {
      if (!dashboardMovies[board_id]) {
        dashboardMovies[board_id] = [];
      }
      dashboardMovies[board_id].push(movie_id);
    });
    const dashboardsWithMovies = dashboards.map(dashboard => {
      const movies = dashboardMovies[dashboard.id] || [];
      return {
        ...dashboard.toJSON(),
        movies,
      };
    });
    res.json(dashboards);
  } catch (err) {
    console.error(err);
  }
});

router.get('/my', async (req, res) => {
  try {
    const userId = req.session.user?.id;
    const dashboards = await Dashboard.findAll({
      where: { user_id: userId },
      order: [['count_likes', 'DESC']],
      attributes: [
        'id',
        'board_name',
        'about',
        'movies',
        'private',
        'count_likes',
        'count_fav',
        'user_id',
      ],
      include: [
        {
          model: User,
        },
      ],
    });
    const dashboardIds = dashboards.map(dashboard => dashboard.id);
    const dashboardAndMovies = await DashboardAndMovie.findAll({
      where: { board_id: dashboardIds },
      attributes: ['board_id', 'movie_id'],
    });
    const dashboardMovies = {};
    dashboardAndMovies.forEach(({ board_id, movie_id }) => {
      if (!dashboardMovies[board_id]) {
        dashboardMovies[board_id] = [];
      }
      dashboardMovies[board_id].push(movie_id);
    });
    const dashboardsWithMovies = dashboards.map(dashboard => {
      const movies = dashboardMovies[dashboard.id] || [];
      return {
        ...dashboard.toJSON(),
        movies,
      };
    });
    res.json(dashboards);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post('/new', async (req, res) => {
  try {
    const newDash = await Dashboard.create({
      ...req.body,
      movies: JSON.stringify(req.body.movies),
    });
    console.log('REQQQQ', req.body);
    const { id } = newDash;
    for (const el of req.body.movies) {
      await DashboardAndMovie.findOrCreate({
        where: { board_id: id, movie_id: el.id },
      });
    }
    const dash = await DashboardAndMovie.findAll({
      where: { board_id: id },
      include: [{ model: Dashboard, where: { user_id: req.body.user_id } }],
    });
    const dashboard = Dashboard.findAll();
    res.json(dashboard);
  } catch (err) {
    console.error(err);
  }
});

router.post('/like', async (req, res) => {
  try {
    const user = req.session.user.id;
    const [like, created] = await Like.findOrCreate({
      where: { board_id: req.body.id, user_id: user },
    });
    if (created) {
      const dash = await Dashboard.findByPk(req.body.id, {
        include: [
          {
            model: User,
          },
        ],
      });
      dash.count_likes += 1;
      await Dashboard.update(
        { count_likes: dash.count_likes },
        { where: { id: req.body.id } }
      );
      const dashAndLikes = await Like.findAll();
      res.json({ dash, dashAndLikes });
    } else {
      await Like.destroy({ where: { board_id: req.body.id, user_id: user } });
      const dash = await Dashboard.findByPk(req.body.id, {
        include: [
          {
            model: User,
          },
        ],
      });
      dash.count_likes -= 1;
      await Dashboard.update(
        { count_likes: dash.count_likes },
        { where: { id: req.body.id } }
      );
      const dashAndLikes = await Like.findAll();
      res.json({ dash, dashAndLikes });
    }
  } catch (err) {
    console.error(err);
  }
});

router.delete('/del/:id', async (req, res) => {
  try {
    const dash = await Dashboard.findByPk(req.params.id);
    if (req.session.user.id === dash.user_id) {
      await Dashboard.destroy({ where: { id: req.params.id } });
    }
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.patch('/edit/:id', async (req, res) => {
  try {
    await Dashboard.update(
      {
        ...req.body,
        movies: JSON.stringify(req.body.movies),
      },
      { where: { id: req.params.id } }
    );
    const dashboard = await Dashboard.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
      ],
    });
    res.json(dashboard);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get('/movies', async (req, res) => {
  try {
    const dashboardsAndMovies = await DashboardAndMovie.findAll();
    res.json(dashboardsAndMovies);
  } catch (err) {
    console.error(err);
  }
});

router.get('/favourite', async (req, res) => {
  try {
    const favourites = await Favourite.findAll({
      where: { user_id: req.session.user?.id },
    });
    const boards = await Dashboard.findAll({
      where: { id: favourites.map(el => el.board_id) },
      include: [
        {
          model: User,
        },
      ],
    });
    res.json(boards);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router
  .route('/favourite/:id')
  .post(async (req, res) => {
    try {
      const favourite = await Favourite.create({
        user_id: req.session.user.id,
        board_id: req.params.id,
      });
      res.json(favourite);
    } catch (err) {
      console.error(err);
    }
  })
  .delete(async (req, res) => {
    try {
      await Favourite.destroy({ where: { board_id: req.params.id } });
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

router.get('/likes', async (req, res) => {
  try {
    const likes = await Like.findAll();
    res.json(likes);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
