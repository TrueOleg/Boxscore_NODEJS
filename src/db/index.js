import mongo from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
const MongoClient = mongo.MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-jh1s3.gcp.mongodb.net/test?retryWrites=true";
const db = process.env.NODE_ENV === "development" ? process.env.DB_URI_DEVELOP : process.env.DB_URI_PROD;
const client = new MongoClient(uri, { useNewUrlParser: true });
var mlb, nba;

client.connect(err => {

  mlb = client.db(db).collection('MLB');
  nba = client.db(db).collection('NBA');
});

export { client, mlb, nba }