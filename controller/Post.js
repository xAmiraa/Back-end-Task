const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const sortArray = require("sort-array");
fetch("https://api.hatchways.io/assessment/blog/posts?tag=tech")
  .then((response) => response.json())
  .then((data) => {
    router.get("/api/posts", (request, response) => {
      const tag = request.query.tag;
      const sort = request.query.sortBy;
      const direction = request.query.direction;

      if (!tag) {
        return response
          .status(200)
          .json({ message: "Tags parameter is required" });
      } else {
        var sortedById = sortArray(data.posts, {
          by: "id",
          order: direction,
        });
        response.json(sortedById);
      }

      if (sort === "reads") {
        var sortedByReads = sortArray(data.posts, {
          by: "reads",
          order: direction,
        });
        return response.status(200).json(sortedByReads);
      } else if (sort === "likes") {
        var sortedByLikes = sortArray(data.posts, {
          by: "likes",
          order: direction,
        });
        return response.status(200).json(sortedByLikes);
      } else if (sort === "popularity") {
        var sortedByPopularity = sortArray(data.posts, {
          by: "popularity",
          order: direction,
        });
        return response.status(200).json(sortedByPopularity);
      } else if (sort != "popularity" && sort != "reads" && sort != "likes") {
        return response
          .status(400)
          .json({ error: "sortBy parameter is invalid" });
      }
    });
  });
router.get("/ping", (request, response) => {
  return response.status(200).json({
    success: true,
  });
});

module.exports = router;
