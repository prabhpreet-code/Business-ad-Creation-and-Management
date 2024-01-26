const cron = require("node-cron");
const advertisementModel = require("../models/advertisementModel");

module.exports = function () {
  //Cron job scheduled to run every day at 12 midnight and 12 noon to change the isStarted variable that eventually determines which current scheduled ad to show
  const job = cron.schedule(
    "0 0,12 * * *",
    async () => {
      // current date
      const formattedDate = new Date().toISOString().split("T")[0];
      const dateObject = new Date(formattedDate);

      // checks if current date lies in between started and ended scheduled date for the advertisement and sets isStarted true
      const ifAdvertisementIsActive = await advertisementModel.updateMany(
        {
          "duration.startDate": { $lte: dateObject },
          "duration.endDate": { $gte: dateObject },
        },
        { $set: { isStarted: true } }
      );

      // checks if current date lies in between started and ended scheduled date for the advertisement and sets isStarted false if it's doesnt
      const ifAdvertisementNotActive = await advertisementModel.updateMany(
        {
          "duration.startDate": { $gt: dateObject },
          "duration.endDate": { $lt: dateObject },
        },
        { $set: { isStarted: false } }
      );
    },
    {
      scheduled: false,
    }
  );

  job.start();
};
