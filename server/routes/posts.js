const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const postActions = require("../../database/PostsAction");

router.get("/", function (req, res, next) {
  let myQuery;
  JSON.stringify(req.query) !== "{}"
    ? (myQuery = req.query)
    : (myQuery = false);
  console.log(req.query);
  postActions.getPosts((data) => {
    res.json(data);
  }, myQuery);
});

router.post("/", function (req, res, next) {
  postActions.postPosts(req.body, (data) => res.send(data));
});

router.put("/", function (req, res, next) {
  postActions.putPosts(req.body, (data) => res.send(data));
});

router.delete("/", function (req, res, next) {
  console.log("req.params.id: ", req.query);
  postActions.deletePost(parseInt(req.query.id), (data) => res.send(data));
});

module.exports = router;
