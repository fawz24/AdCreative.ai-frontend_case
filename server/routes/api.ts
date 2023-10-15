import express from "express";
import data from "../items.json";

var router = express.Router();

const categories = data.data.map((entry, index) => ({
  id: `${index}`,
  category: entry,
}));

router.get("/category", function (req, res, next) {
  res.json({
    data: categories,
  });
});

export default router;
