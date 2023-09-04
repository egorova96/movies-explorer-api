const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema({
  country: {
    required: true,
    type: String,
  },
  director: {
    required: true,
    type: String,
  },
  duration: {
    required: true,
    type: Number,
  },
  year: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    validate: {
      validator: (url) => isUrl(url),
      message: 'Некорректная ссылка',
    },
    type: String,
  },
  trailerLink: {
    required: true,
    validate: {
      validator: (url) => isUrl(url),
      message: 'Некорректная ссылка',
    },
    type: String,
  },
  thumbnail: {
    required: true,
    validate: {
      validator: (url) => isUrl(url),
      message: 'Некорректная ссылка',
    },
    type: String,
  },
  owner: {
    ref: 'user',
    required: true,
    type: mongoose.SchemaTypes.ObjectId,
  },
  movieId: {
    required: true,
    type: Number,
  },
  nameRU: {
    required: true,
    type: String,
  },
  nameEN: {
    required: true,
    type: String,
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);