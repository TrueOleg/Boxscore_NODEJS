import { urlHelper } from '../helpers/url-helper';
import { config } from '../../config';
import axios from 'axios';

async function gameController(req, res, next) {
  try {
    const league = req.query.league;
    console.log('config', config);
    getLeagueData(res, config[league].leagueId, config[league].client, next);
  } catch (err) {
    next(new Error(err.message));
  }
}

async function getLeagueData(res, leagueId, mongoCol, next) {
  try {
    const doc = await mongoCol.findOne({});
    const lastUpdate = new Date(doc.lastUpdate);
    const now = new Date();
    const time = ((now - lastUpdate) / 1000).toString();
    if (time < 15) {
      res.status(200).send(doc);
    } else {
      const newDoc = dataController(leagueId, mongoCol);
      res.status(200).send(newDoc)
    }
  } catch (err) {
    next(new Error(err.message));
  }
}

async function dataController(league, mongoCol) {
  try {
    const url = urlHelper(league);
    let axiosDoc = await axios.get(url);
    let data = axiosDoc.data;
    data.lastUpdate = new Date();
    const doc = await mongoCol.findOneAndUpdate({}, { $set: data }, { upsert: true, returnNewDocument: true });
    return doc;
  } catch (err) {
    console.log('error', err);
  }
}

export { gameController, dataController };