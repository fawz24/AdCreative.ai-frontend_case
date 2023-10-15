import express from "express";
import data from "../items.json";

var router = express.Router();

router.get("/category", function (req, res, next) {
  res.json(data);
});

export default router;
