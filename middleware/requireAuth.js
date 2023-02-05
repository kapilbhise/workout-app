const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const requireAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;
  //   console.log(authorization);
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  //   const bearer = authorization.split(" ")[0];
  const token = authorization.split(" ")[1];
  // console.log(token);

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    // console.log("-id: " + _id);
    req.user = await User.findOne({ _id }).select("_id");
    // console.log("-user: " + req.user._id)
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
