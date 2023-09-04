const mongoose = require('mongoose');

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
      message: 'Некорректный email',
    },
    type: String,
  },
  password: {
    required: true,
    select: false,
    type: String,
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);