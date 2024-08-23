const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Extract the token from the Authorization header
  const token = req.header("Authorization").replace("Bearer ", "");

  // If no token is found, respond with a 401 Unauthorized status
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify the token using the secret key
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the decoded user information to the request object
    req.user = decoded.user;
    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If token verification fails, respond with a 401 Unauthorized status
    res.status(401).json({ msg: "Token is not valid" });
  }
};
