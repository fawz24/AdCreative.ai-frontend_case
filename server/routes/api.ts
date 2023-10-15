import express from "express";
import { decodeHTML } from "entities";
import data from "../items.json";

var router = express.Router();

const categories = data.data.map((entry, index) => ({
  id: `${index}`,
  category: decodeHTML(entry),
}));

router.get("/category", function (req, res, next) {
  res.json({
    data: categories,
  });
});

router.post("/category", function (req, res, next) {
  const { selectedCategories, query = "" } = req.body as {
    selectedCategories: string[];
    query: string;
  };
  const decodededQuery = decodeHTML(query);
  console.log({ decodededQuery });
  const pattern = RegExp(`${decodededQuery.trim().replace(".", "\\.")}`, "i");
  const matchingCategories = categories.filter(
    (category) =>
      pattern.test(category.category) &&
      !selectedCategories.includes(category.id)
  );
  res.json({
    data: {
      selectedCategories,
      matchingCategories,
    },
  });
});

export default router;
