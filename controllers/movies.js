const Movie = require('../models/movies');
const {
  OK,
  STATUS_CODE,
} = require('../utils/constants');

const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({}).then((movies) =>
  res.send(movies))
  .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration,
    year, description, image,
    trailerLink, thumbnail, movieId,
    nameRU, nameEN,
  } = req.body;
  const { _id } = req.user;

  Movie
    .create({
      country, director, duration,
      year, description, image,
      trailerLink, thumbnail, movieId,
      nameRU, nameEN, owner: _id,
    })
    .then((movie) => res.status(OK).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Введены некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { _id } = req.params;

  Movie.findById(_id).then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найден');
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Недостаточно прав');
      }
      Movie
        .findByIdAndRemove(_id)
        .then((movie) => {
          if (!movie) {
            throw new NotFoundError('Фильм не найден');
          }
          res.status(STATUS_CODE).send(movie);
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError('Введены некорректные данные'));
      }
      return next(err);
    });
};