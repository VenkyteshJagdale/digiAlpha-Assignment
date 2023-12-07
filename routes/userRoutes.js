const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");


//routers for various api's.
router.get("/", UserController.getAllUser);
router.post("/register", UserController.registerUser);
router.get("/:id", UserController.getRegisterUserById);
router.put("/:id", UserController.updateRegisterUser);
router.delete("/:id", UserController.deleteRegisterUser);
router.get("/filter", UserController.listAllRegisterUsers);

module.exports = router;
