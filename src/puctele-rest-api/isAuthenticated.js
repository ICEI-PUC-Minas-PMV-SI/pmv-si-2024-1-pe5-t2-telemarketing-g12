const jwt = require("jsonwebtoken");
const { jwtSecret } = require("./config");

module.exports = {
  check: (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) {
        return res.status(403).json({
          status: false,
          error: 'Invalid access token provided, please login again.'
        });
      }

      req.user = user;
      next();
    });
  }
}