import express from 'express';

import { gameController } from '../controllers/games';

const router = express.Router();

router.get('/games', gameController);

export default router;
