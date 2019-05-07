import { mlb, nba } from '../db';

function mlbController(req, res, next) {
  const https = require('https');

  https.get('https://chumley.barstoolsports.com/dev/data/games/6c974274-4bfc-4af8-a9c4-8b926637ba74.json', (resp) => {
    let data = '';

    resp.setEncoding('utf8');
    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      mlb.insertOne({ data })
      console.log('save mlb');
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}

function nbaController(req, res, next) {
  const https = require('https');

  https.get('https://chumley.barstoolsports.com/dev/data/games/6c974274-4bfc-4af8-a9c4-8b926637ba74.json', (resp) => {
    let data = '';

    resp.setEncoding('utf8');
    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      nba.insertOne({ data })
      console.log('save nba');
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}
export { mlbController, nbaController };