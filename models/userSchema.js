/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const { INCORRECT_EMAIL, INCORRECT_ERROR } = require('../utils/constants');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    minlength: 2,
    maxlength: 30,
    type: String,
  },
  email: {
    required: true,
    unique: true,
    validate: {
      validator: (email) => isEmail(email),
      message: INCORRECT_EMAIL,
    },
    type: String,
  },
  password: {
    required: true,
    select: false,
    type: String,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(INCORRECT_ERROR);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(INCORRECT_ERROR);
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
