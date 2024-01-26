const mongoose = require("mongoose");

const AdvertisementSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    target_audience: {
      type: Array,
      required: true,
    },
    duration: {
      startDate: Date,
      endDate: Date,
    },
    multimedia: {
      type: String,
      required: true,
    },
    isStarted: {
      type: Boolean,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("advertisement", AdvertisementSchema);
