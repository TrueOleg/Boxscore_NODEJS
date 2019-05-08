
import { mlb, nba } from '../db';
import { NBA, MLB, NBA_ID, MLB_ID } from '../const';
import { urlHelper } from '../helpers/url-helper';
import axios from 'axios';

async function gameController(req, res, next) {
  try {
    const league = req.query.league;
    let mongoCol, leagueId;
    if (league === NBA) {
      getLeagueData(res, NBA_ID, nba);
    } else if (league === MLB) {
      getLeagueData(res, MLB_ID, mlb);
    }
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

async function dataController(league, mongoCol, next) {
  try {
    const url = urlHelper(league);
    let axiosDoc = await axios.get(url);
    let data = axiosDoc.data;
    data.lastUpdate = new Date();
    const doc = await mongoCol.findOneAndUpdate({}, { $set: data }, { upsert: true, returnNewDocument: true });
    return doc;
  } catch (err) {
    next(new Error(err.message));
  }
}


export { gameController, dataController };