import express from "express";

import { getUser } from "../contollers/userController.js";
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("it works");
});

router.get("/find/:userId", getUser);

export default router;
