const jwt = require("jsonwebtoken");
const User = require("../Models/usermodel");
const Auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.Token_key);
    const user = await User.findOne({ _id: decoded._id, "tokens.token": token });
    if (!user) {
      throw new Error();
    }
    else{
    req.user = user;
    next();
}
  } catch (e) {
    res.status(401).send({ error: "Please Authticate" });
    next()
  }
};
module.exports = Auth;