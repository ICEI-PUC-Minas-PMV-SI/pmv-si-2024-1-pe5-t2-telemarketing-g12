const router = require("express").Router();

const AuthorizationController = require("./controller");

router.post(
  "/signup",
  AuthorizationController.register
);

router.post(
  "/register",
  AuthorizationController.registerMultiples
);

router.post(
  "/login",
  AuthorizationController.login
);

module.exports = router;