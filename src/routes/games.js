import express from 'express';

import { gameController } from '../controllers/games';

const games = express.Router();

games.get('/games', gameController);

export default games;
