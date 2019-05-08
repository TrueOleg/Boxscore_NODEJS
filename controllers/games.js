import { mongo, ObjectID } from 'mongodb';
import { mlb, nba } from '../db';
import { NBA, MLB } from '../const';
import { urlHelper } from '../helpers/url-helper';
import axios from 'axios';

async function gameController(req, res, next) {
  try {
    const league = req.query.league;
    let mongoCol;
    if (league === NBA) {

      mongoCol = nba;
      const doc = await mongoCol.findOne({});
      const lastUpdate = new Date(doc.data.lastUpdate);
      const now = new Date();
      const time = ((now - lastUpdate) / 1000).toString();
      if (time < 15) {
        res.send(doc);
      } else {
        dataController(req, res, next, league, mongoCol);
      }

    } else if (league === MLB) {

      mongoCol = mlb;
      const doc = await mongoCol.findOne({});
      const lastUpdate = new Date(doc.data.lastUpdate);
      const now = new Date();
      const time = ((now - lastUpdate) / 1000).toString();
      if (time < 15) {
        res.send(doc);
      } else {
        dataController(req, res, next, league, mongoCol);
      }
    }
  } catch (err) {

  }
}

async function dataController(req, res, next, league, mongoCol) {
  try {
    const url = urlHelper(league);
    let axiosDoc = await axios.get(url);
    let data = axiosDoc.data;
    data.lastUpdate = new Date();
    const doc = await mongoCol.findOne({});
    if (doc !== null) {
      await mongoCol.save({ data, _id: doc._id });
      const newDoc = await mongoCol.findOne({});
      res.send(newDoc);
    } else {
      await mongoCol.save({ data });
      const newDoc = await mongoCol.findOne({});
      res.send(newDoc);
    }
  } catch (err) {

  }
}

async function scheduleDataController(league, mongoCol) {
  try {
    const url = urlHelper(league);
    let axiosDoc = await axios.get(url);
    let data = axiosDoc.data;
    data.lastUpdate = new Date();
    const doc = await mongoCol.findOne({});
    console.log('doc', doc);
    if (doc !== null) {
      await mongoCol.save({ data, _id: doc._id });
    } else {
      await mongoCol.save({ data });
    }
  } catch (err) {

  }
}


export { gameController, scheduleDataController };