const express = require("express");
const { loggingMiddleware, twitterMiddleware } = require("../middlewares");
const { pages, api } = require("../router");

module.exports = (app) => {
 // Use middlewares
 app.use(express.json());
 app.use(express.urlencoded({
  extended: false
 }));
 app.use(loggingMiddleware);
 app.use(twitterMiddleware);
 app.use("/pages", pages);
 app.use("/api", api);

 return app;
};
