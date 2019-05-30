const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")


router.get("/users/signup", userController.signUp);
router.get("/users/sign_in", userController.signInForm);
router.get("/users/sign_out", userController.signOut);
router.get("/users/:id", userController.show);
router.post("/users/signup", userController.signUp);



module.exports = router;
