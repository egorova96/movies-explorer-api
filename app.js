const express = require('express');
const app = express();
const mongoose = require('mongoose');

const { PORT = 3000, dataBase_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
mongoose.connect(dataBase_URL);

const { errors } = require('celebrate');
const limiter = require('./middlewares/limiter');
const routes = require('routes');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('cors');

app.use(errors());
app.use(express.json());
app.use(requestLogger);
app.use(routes);
app.use(limiter);
app.use(cors());
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
