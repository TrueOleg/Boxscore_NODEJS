import games from "./games";

import express from "express";

const router = express.Router();

router.use("/", games);

export default router;
