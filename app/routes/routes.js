const express = require("express");
const { Router } = require("express");
const { verifyToken } = require("../middleware/auth.middleware")

// router.use(express.json());

const {
  login,
  signUp,
  readToken
} = require('../controllers/auth.controller');

const {
  createUser,
  findUserById,
  findAll,
  updateUserById,
  deleteUserById,
} = require("../controllers/user.controller.js");
const {
  createBootcamp,
  findById,
  addUserBootcamp,
  findThem,
} = require("../controllers/bootcamp.controller.js");

const router = Router();

//user routes

router.post("/api/usuarios", createUser);
router.get("/api/usuarios/:id", verifyToken, findUserById);
router.get("/api/usuarios/", verifyToken, findAll);
router.put("/api/usuarios/:id", verifyToken, updateUserById);
router.delete("/api/usuarios/:id", verifyToken, deleteUserById);

// bootcamps routes

router.post("/api/bootcamps", verifyToken, createBootcamp);
router.post("/api/bootcamps/adduser", verifyToken, addUserBootcamp);
router.get("/api/bootcamps/:id", verifyToken, findById);
router.get("/api/bootcamp/", findThem);

//middlewares

router.post('/api/login', login)
router.post('/api/signUp', signUp)
router.post('/api/readToken', verifyToken, readToken)

module.exports = router;
