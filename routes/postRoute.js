const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();

// router.get("/", authController.getAllUser);

router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.post("/logout", authController.logout); // post hay delete???

// router.post("/login", authController.login);

module.exports = router;