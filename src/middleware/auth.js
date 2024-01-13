const jwt = require("jsonwebtoken");
const jwtSecrectKey = "cdccsvavsvfssbtybnjnu";

exports.auth = (roles) => (req, res, next) => {
  try {
    jwt.verify(req.headers.token, jwtSecrectKey, (err, decoded) => {
      if (err || !roles.includes(decoded.role)) {
        throw Error("Please authenticate");
      }
    });
    next();
  } catch (err) {
    console.log("=====err=====", err);
  }
};
