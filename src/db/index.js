import mongo from 'mongodb';
import { config } from '../../config';

const MongoClient = mongo.MongoClient;
console.log('db1');
// const initDb = async () => {
//   console.log('db2');
//   const client = await MongoClient.connect(config.dbUrl);
//   console.log('db3');
//   config.mlb.client = client.db(config.db).collection('MLB');
//   config.nba.client = client.db(config.db).collection('NBA');
//   console.log('dbconfig', config);
// }

const startDb = async () => {
  console.log('db2');
  const client = await MongoClient.connect(config.dbUrl);
  console.log('db3');
  config.mlb.client = client.db(config.db).collection('MLB');
  config.nba.client = client.db(config.db).collection('NBA');
  console.log('dbconfig', config)
};
// MongoClient.connect(config.dbUrl)
//   .then((client) => {
//     config.mlb.client = client.db(config.db).collection('MLB');
//     config.nba.client = client.db(config.db).collection('NBA');
//     console.log('dbconfig', config);
//   })
//   .catch((err) => {
//     console.log('error', err);
//   })

export { MongoClient, startDb }