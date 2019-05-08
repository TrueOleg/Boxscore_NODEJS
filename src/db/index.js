import mongo from 'mongodb';
import { config } from '../../config';

const MongoClient = mongo.MongoClient;
const client = new MongoClient(config.dbUrl, { useNewUrlParser: true });
// let mlb, nba;

client.connect(err => {

  config.mlb.client = client.db(config.db).collection('MLB');
  config.nba.client = client.db(config.db).collection('NBA');
});

export { client }