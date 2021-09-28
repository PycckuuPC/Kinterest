require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const axios = require('axios');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const commentApiRouter = require('./routes/commentApiRouter');
const subscribersApiRouter = require('./routes/subscribersApiRouter');
const userRouter = require('./routes/userRouter');
const dashboardRouter = require('./routes/dashboardRouter');

const PORT = process.env.SERVER_PORT || 3002;
const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: 'sid',
    secret: process.env.SESSION_SECRET ?? 'test',
    resave: true,
    store: new FileStore(),
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 12,
      httpOnly: true,
    },
  })
);
app.use(express.json());

app.use(express.static(path.join(__dirname, '/public/img')));

app.use('/api/user', userRouter);
app.use('/api/dashboards', dashboardRouter);
app.use('/api/comment', commentApiRouter);
app.use('/api/sub', subscribersApiRouter);

app.get('/api/movies', async (req, res) => {
  try {
    const { data } = await axios(
      'https://api.themoviedb.org/3/discover/movie?api_key=377930f8839394f83534a7acc12c5ae3&language=ru-RU&region=RU&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&vote_count.gte=1000&with_watch_monetization_types=flatrate'
    );
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => console.log(`App has started on port ${PORT}`));
