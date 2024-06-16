const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserModel = require('../models/User');

const { jwtSecret, jwtExpirationInSeconds } = require('../config');

const generateAccessToken = (username, userId) => {
  return jwt.sign(
    {
      userId,
      username,
    },
    jwtSecret,
    {
      expiresIn: jwtExpirationInSeconds,
    }
  );
};

const encryptPassword = (password) => {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
};

module.exports = {
  register: (req, res) => {
    const payload = req.body;

    let encryptedPassword = encryptPassword(payload.password);
    UserModel.createUser(Object.assign(payload, { password: encryptedPassword }))
      .then((user) => {
        const accessToken = generateAccessToken(payload.username, user.id);

        return res.status(200).json({
          status: true,
          data: {
            user: user.toJSON(),
            token: accessToken,
          },
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  registerMultiples: async (req, res) => {
    const payload = req.body;
    const result = new Array();

    await Promise.all(
      payload.map(async (element) => {
        let encryptedPassword = encryptPassword(element.password);
        await UserModel.createUser(Object.assign(element, { password: encryptedPassword }))
          .then((user) => {
            result.push(user);
          })
          .catch((err) => {
            return res.status(500).json({
              status: false,
              error: err,
            });
          });
      })
    ).finally(() => {
      return res.status(200).json({
        status: true,
        data: JSON.stringify(result),
      });
    });
  },

  login: (req, res) => {
    const { email, password } = req.body;

    UserModel.findUser({ email })
      .then((user) => {
        if (!user) {
          return res.status(400).json({
            status: false,
            error: {
              message: `Could not find any user with email: \`${email}\`.`,
            },
          });
        }
        const encryptedPassword = encryptPassword(password);
        if (user.password !== encryptedPassword) {
          return res.status(400).json({
            status: false,
            error: {
              message: `Provided email and password did not match.`,
            },
          });
        }

        const accessToken = generateAccessToken(user.username, user.id);
        return res.status(200).json({
          status: true,
          data: {
            user: user.toJSON(),
            token: accessToken,
          },
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },
};
