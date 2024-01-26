const express = require("express");
const {
  createAdvertisementData,
  getAdvertisementData,
  updateAdvertisementDataById,
  deleteAdvertisementDataById,
  getAdvertisementDataById,
} = require("../controllers/advertisementController");
const { authenticateJWT } = require("../middlewares/authMiddleware");
const router = express.Router();

router
  .route("/")
  //post advertisement data
  .post(authenticateJWT, createAdvertisementData)
  //get advertisement data
  .get(getAdvertisementData);

router
  .route("/:id")
  //get advertisement data by id
  .get(authenticateJWT, getAdvertisementDataById)
  //put advertisement data by id
  .put(authenticateJWT, updateAdvertisementDataById)
  //delete advertisement data by id
  .delete(authenticateJWT, deleteAdvertisementDataById);

module.exports = router;
