import dotenv from 'dotenv';
dotenv.config();
export let config = {
  db: process.env.NODE_ENV === "development" ? process.env.DB_URI_DEVELOP : process.env.DB_URI_PROD,
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