import dotenv from 'dotenv';
dotenv.config();

function getCurrentDB() {
  switch (process.env.NODE_ENV) {
    case "development":
      return process.env.DB_URI_DEVELOP;
    case "production":
      return process.env.DB_URI_PROD;
    case "test":
      return process.env.DB_URI_TEST;
  }
}
export let config = {
  db: getCurrentDB(),
  dbUrl: process.env.CLUSTER_URL,
  nba: {
    client: null,
    leagueId: '6c974274-4bfc-4af8-a9c4-8b926637ba74'
  },
  mlb: {
    client: null,
    leagueId: 'eed38457-db28-4658-ae4f-4d4d38e9e212'
  },

}