const express = require("express");
const cookieParser = require("cookie-parser");
const userRoutes = require("../routes/userRoutes");
const advertisementRoutes = require("../routes/advertismentRoutes");

module.exports = function (app) {
  app.use(express.json({ limit: "50mb" }));
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: false }));
  app.use("/api/auth", userRoutes);
  app.use("/api/advertisement", advertisementRoutes);
};
