const jwt = require("jsonwebtoken");
// Authenticate middleware
exports.authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  //verify jwt token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    //update user information
    req.user = user;
    next();
  });
};
