import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import router from './routes';
import { scheduleDataController } from './controllers/games';
import { mlb, nba } from './db';
import { NBA, MLB } from './const';
import schedule from 'node-schedule';

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

var j = schedule.scheduleJob('0-59/15 * * * * *', function () {
  scheduleDataController(NBA, nba);
  scheduleDataController(MLB, mlb);
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3600, () =>
  console.log(`Server is listening on port 3600`))

module.exports = app;
