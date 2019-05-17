import { urlHelper } from '../helpers/url-helper';
import { config } from '../../config';
import axios from 'axios';

function gameController(req, res, next) {
  try {
    const league = req.query.league;
    getLeagueData(res, config[league].leagueId, config[league].client, next);
  } catch (err) {
    next(new Error(err.message));
  }
}

async function getLeagueData(res, leagueId, mongoCol, next) {
  try {
    let doc = await mongoCol.findOne({});
    const lastUpdate = new Date(doc.lastUpdate);
    const now = new Date();

    if (now - lastUpdate > 15 * 1000) {
      doc = dataController(leagueId, mongoCol);
    }

    res.status(200).send(doc)

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