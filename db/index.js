import mongo from 'mongodb';
const MongoClient = mongo.MongoClient;

const uri = "mongodb+srv://admin:admin@cluster0-jh1s3.gcp.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
var mlb, nba;

client.connect(err => {

  mlb = client.db('games').collection('MLB');
  nba = client.db('games').collection('NBA');
  console.log('success');
  // client.close();
});

// function saveGames(data) {
//   console.log('db', db);
//   db.insert(data)
// }

export { client, mlb, nba }