const express = require("express");
const server = express();
var port = 3000;
const postController = require("./Controller/Post");

server.use("/", postController);
server.listen(port, () => {
  console.log(`server listenning on ${port}`);
});
