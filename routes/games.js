import express from 'express';

import { mlbController, nbaController } from '../controllers/games';

const games = express.Router();

games.get('/games/mlb', mlbController);
games.get('/games/nba', nbaController);


export default games;
