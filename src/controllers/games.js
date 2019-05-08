import { urlHelper } from '../helpers/url-helper';
import { config } from '../../config';
import axios from 'axios';

async function gameController(req, res, next) {
  try {
    const league = req.query.league;
    getLeagueData(res, config[league].leagueId, config[league].client);
  } catch (err) {
    next(new Error(err.message));
  }
}

async function getLeagueData(res, leagueId, mongoCol) {
  const doc = await mongoCol.findOne({});
  const lastUpdate = new Date(doc.lastUpdate);
  const now = new Date();
  const time = ((now - lastUpdate) / 1000).toString();
  if (time < 15) {
    res.send(doc);
  } else {
    const newDoc = dataController(leagueId, mongoCol);
    res.send(newDoc)
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
  }
}


export { gameController, dataController };