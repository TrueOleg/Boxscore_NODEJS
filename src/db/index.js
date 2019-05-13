import mongo from 'mongodb';
import { config } from '../../config';

const MongoClient = mongo.MongoClient;

MongoClient.connect(config.dbUrl)
  .then((client) => {
    config.mlb.client = client.db(config.db).collection('MLB');
    config.nba.client = client.db(config.db).collection('NBA');
  })
  .catch((err) => {
    console.log('error', err);
  })

export { MongoClient }