const { SERVER_ERROR } = require("../errors/SERVER_ERROR");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

//@desc Register a User
//@route POST /api/auth/signin
//@access public
exports.registerUserData = async (req, res) => {
  try {
    const { email, password, username, phone, role, description } = req.body;

    if (!username || !email || !password || !phone || !role || !description) {
      res.status(400).send({
        success: false,
        code: 400,
        message: "All Fields are mandatory",
      });
    }

    //validate all params
    const { error } = userRegistrationValidation.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json(error);
    }

    const userAvailable = await userModel.findOne({ email });
    if (userAvailable) {
      res.status(400).send({
        success: false,
        code: 400,
        message: "User already registered",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
      phone,
      role,
      description,
    });

    const registeredUser = {
      username: user.username,
      email: user.email,
      role: user.role,
    };

    res.status(200).json({
      success: true,
      registeredUser,
      msg: "New user registered successfully",
    });
  } catch (err) {
    console.log(err); // Log any errors
    res.status(500).send({ success: false, error: SERVER_ERROR }); // Send a server error response
  }
};

//@desc Login a User
//@route POST /api/auth/login
//@access public
exports.loginUserData = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
      res.status(400).send({
        success: false,
        code: 400,
        message: "All Fields are mandatory",
      });
    }

    //validate all params
    const { error } = userLoginValidation.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json(error);
    }

    const userAvailable = await userModel.findOne({ email });
    if (!userAvailable) {
      res.status(400).send({
        success: false,
        code: 400,
        message: "User not registered",
      });
    }

    if (
      userAvailable &&
      (await bcrypt.compare(password, userAvailable.password))
    ) {
      const accessToken = jwt.sign(
        {
          user: {
            username: userAvailable.username,
            email: userAvailable.email,
            id: userAvailable.id,
            role: userAvailable.role,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "20m" }
      );

      const LoginUser = {
        id: userAvailable._id,
        username: userAvailable.username,
        email: userAvailable.email,
        role: userAvailable.role,
      };

      res.cookie("token", accessToken, {
        withCredentials: true,
        httpOnly: false,
      });

      res.status(200).json({
        success: true,
        accessToken,
        LoginUser,
        msg: "User Logged in successfully",
      });
    } else {
      res.status(400).send({
        success: false,
        code: 400,
        message: "Password Incorrect",
      });
    }
  } catch (error) {
    console.log(error); // Log any errors
    res.status(500).send({ success: false, error: SERVER_ERROR }); // Send a server error response
  }
};

//@access private
// validation of user
const userRegistrationValidation = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "any.required": "Name is required.",
    "string.empty": "Name cannot be empty.",
    "string.min": "Name should be at least 3 characters long.",
    "string.max": "Name should not exceed 30 characters.",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required.",
    "string.empty": "Email cannot be empty.",
    "string.email": "Invalid email format.",
  }),
  phone: Joi.string()
    .length(10)
    .pattern(/[6-9]{1}[0-9]{9}/)
    .required()
    .messages({
      "any.required": "Phone number is required.",
      "string.empty": "Phone number cannot be empty.",
      "string.length": "Phone number must be exactly 10 digits long.",
      "string.pattern.base": "Phone number is invalid.",
    }),
  description: Joi.string().max(50).required().messages({
    "any.required": "Description is required.",
    "string.empty": "Description cannot be empty.",
    "string.max": "Description should not exceed 50 characters.",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required.",
    "string.empty": "Password cannot be empty.",
  }),
  role: Joi.string().required().messages({
    "any.required": "Role is required.",
    "string.empty": "Role cannot be empty.",
  }),
});

//@access private
// validation of user
const userLoginValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required.",
    "string.empty": "Email cannot be empty.",
    "string.email": "Invalid email format.",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required.",
    "string.empty": "Password cannot be empty.",
  }),
});
