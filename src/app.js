import createError from 'http-errors';
import http from 'http';
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import router from './routes';
import { startDb } from './db';
import { dataController } from './controllers/games';
import { config } from '../config';
import schedule from 'node-schedule';
import socketIO from 'socket.io';


const startServer = async () => {
  await startDb();

  const app = express();
  app.use(cors());
  app.use(logger('dev'));

  app.use('/api', router);
  await dataController(config.nba.leagueId, config.nba.client);
  await dataController(config.mlb.leagueId, config.mlb.client);

  let j = schedule.scheduleJob('0-59/15 * * * * *', function () {
    dataController(config.nba.leagueId, config.nba.client);
    dataController(config.mlb.leagueId, config.mlb.client);
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
    res.send(err);
  });
  // const server = http.createServer(app);
  const server = await app.listen(3600, () =>
    console.log(`Server is listening on port 3600`));

  const io = socketIO(server);
  io.origins("*:*");

  io.on("connection", socket => {
    schedule.scheduleJob('0-59/15 * * * * *', async function () {

      socket.emit("nba", {
        data: await config.nba.client.findOne({})
      });

      socket.emit("mlb", {
        data: await config.mlb.client.findOne({})
      });

    });
    socket.on('disconnect', function () {
      io.emit('user disconnected');
    });
  })

  return server;

}


export default startServer;
