const { SERVER_ERROR } = require("../errors/SERVER_ERROR");
const Joi = require("joi");
const advertisementModel = require("../models/advertisementModel");

//@desc POST Advertisements
//@route post /api/advertisement/
//@access public
exports.createAdvertisementData = async (req, res) => {
  try {
    const { title, description, target_audience, duration, multimedia } =
      req.body;

    if (
      !title ||
      !description ||
      !target_audience ||
      !duration ||
      !multimedia
    ) {
      res.status(400).send({
        success: false,
        code: 400,
        message: "All Fields are mandatory",
      });
    }

    //validate all params
    const { error } = createAdvertisementValidation.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json(error);
    }

    // current date
    const formattedDate = new Date().toISOString().split("T")[0];

    const dateObject = new Date(formattedDate);

    let createdAdvertisement;

    // // checks if current date lies in between started and ended scheduled date for the advertisement
    if (duration.startDate <= dateObject && duration.endDate >= dateObject) {
      createdAdvertisement = await advertisementModel.create({
        title,
        description,
        target_audience,
        duration: {
          startDate: new Date(duration.startDate),
          endDate: new Date(duration.endDate),
        },
        multimedia,
        createdBy: req.user.user.id,
        isStarted: true, // important for checking schedule
      });
    } else {
      createdAdvertisement = await advertisementModel.create({
        title,
        description,
        target_audience,
        duration: {
          startDate: new Date(duration.startDate),
          endDate: new Date(duration.endDate),
        },
        multimedia,
        createdBy: req.user.user.id,
        isStarted: false, // important for checking schedule
      });
    }

    res.status(200).json({
      success: true,
      createdAdvertisement,
      msg: "New Advertisement created successfully",
    });
  } catch (err) {
    console.log(err); // Log any errors
    res.status(500).send({ success: false, error: SERVER_ERROR }); // Send a server error response
  }
};

//@desc Get Advertisements
//@route GET /api/advertisement/
//@access public
exports.getAdvertisementData = async (req, res) => {
  try {
    //pagination
    const { page, limit } = req.query;

    // filtering
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    //sorting
    let sortBy;
    if (req.query.sort) {
      sortBy = req.query.sort;
    } else {
      sortBy = "-createdAt";
    }

    // count total documents
    const count = await advertisementModel.countDocuments().exec();

    // get all advertisements from db
    const advertisements = await advertisementModel
      .find(queryObj)
      .sort(sortBy)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      advertisements,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalItems: count,
      msg: "All advertisements sent successfully",
    });
  } catch (error) {
    console.log(error); // Log any errors
    res.status(500).send({ success: false, error: SERVER_ERROR }); // Send a server error response
  }
};

//@desc PUT Advertisements
//@route put /api/advertisement/:id
//@access public
exports.updateAdvertisementDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedDocument = await advertisementModel.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      }
    );

    if (!updatedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json({
      success: true,
      updatedDocument,
      msg: "New Advertisement updated successfully",
    });
  } catch (err) {
    console.log(err); // Log any errors
    res.status(500).send({ success: false, error: SERVER_ERROR }); // Send a server error response
  }
};

//@desc DELETE Advertisements
//@route delete /api/advertisement/:id
//@access public
exports.deleteAdvertisementDataById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await advertisementModel.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Advertisement not found" });
    }

    res.status(200).json({
      success: true,
      deletedItem,
      msg: "New Advertisement deleted successfully",
    });
  } catch (err) {
    console.log(err); // Log any errors
    res.status(500).send({ success: false, error: SERVER_ERROR }); // Send a server error response
  }
};

//@desc Get Advertisements
//@route GET /api/advertisement/:id
//@access public
exports.getAdvertisementDataById = async (req, res) => {
  try {
    const { id } = req.params;

    const getDocumentById = await advertisementModel.findById(id);

    if (!getDocumentById) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json({
      success: true,
      getDocumentById,
      msg: " Advertisement found successfully",
    });
  } catch (err) {
    console.log(err); // Log any errors
    res.status(500).send({ success: false, error: SERVER_ERROR }); // Send a server error response
  }
};

//@access private
// validation of advertisement
const createAdvertisementValidation = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Title is required.",
    "string.empty": "Title cannot be empty.",
  }),
  description: Joi.string().max(50).required().messages({
    "any.required": "Description is required.",
    "string.empty": "Description cannot be empty.",
    "string.max": "Description should not exceed 50 characters.",
  }),
  target_audience: Joi.array().required().messages({
    "any.required": "Target Audience is required.",
  }),
  duration: Joi.object({
    startDate: Joi.date(),
    endDate: Joi.date(),
  }),
  multimedia: Joi.string().required().messages({
    "any.required": "Multimedia is required.",
    "string.empty": "Multimedia cannot be empty.",
  }),
});
