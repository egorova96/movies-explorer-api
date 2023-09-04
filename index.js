const router = require('express').Router();
const celebrate = require('./middlewares/celebrates');
const usersRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const { auth } = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');

router.post('/signup', celebrate.createUser, createUser);

router.post('/signin', celebrate.login, login);

router.use(auth);
router.use(usersRouter);
router.use(movieRouter);

router.use('*', (req, res, next) => {
  return next(new NotFoundError('Ресурс не найден'));
});

module.exports = router;