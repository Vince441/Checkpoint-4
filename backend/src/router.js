/* eslint-disable no-undef */

const express = require("express");

const router = express.Router();
const { hashPassword, verifyToken } = require("./services/auth");
const uploadDino = require("./middlewares/uploadDino");

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const dinoControllers = require("./controllers/dinoControllers");
const utilisateurControllers = require("./controllers/utilisateurControllers");
const authControllers = require("./controllers/authControllers");

// Route to get a list of items
router.post("/login", authControllers.login);
// Route to get a specific item by ID
router.use(verifyToken);
router.get("/dinosaures", dinoControllers.browse);
router.get("/utilisateur", utilisateurControllers.browse);
router.get("/utilisateur/:id", utilisateurControllers.read);
router.get("/dinosaures/:id", dinoControllers.read);

router.post("/utilisateur", hashPassword, utilisateurControllers.add);
router.get("/dinosaures/dinobyuser/:id", dinoControllers.readByUserId);
// Route to add a new item
router.post("/dinosaures", dinoControllers.add);

router.post(
  "/dinoaures/adddino",
  uploadDino.single("image"),
  dinoControllers.getUploadImage
);

// Route to modify an item
router.put("/dinosaures/:id", dinoControllers.edit);
router.put("/utilisateur/:id", utilisateurControllers.edit);

// Route to delete an item
router.delete("/dinosaures/:id", dinoControllers.destroy);
router.delete("/utilisateur/:id", utilisateurControllers.destroy);

router.get("/userbytoken", utilisateurControllers.getByToken);

module.exports = router;
