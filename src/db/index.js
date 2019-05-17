import mongo from 'mongodb';
import { config } from '../../config';

const MongoClient = mongo.MongoClient;

const startDb = async () => {
  const client = await MongoClient.connect(config.dbUrl);
  config.mlb.client = client.db(config.db).collection('MLB');
  config.nba.client = client.db(config.db).collection('NBA');
};

export { MongoClient, startDb }