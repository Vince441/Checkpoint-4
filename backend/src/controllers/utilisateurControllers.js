/* eslint-disable camelcase */
/* eslint-disable no-undef */
// Import access to database tables
const jwt = require("jsonwebtoken");
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all users from the database
    const users = await tables.utilisateur.readAll();

    // Respond with the users in JSON format
    res.json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided ID
    const user = await tables.utilisateur.read(req.params.id);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the user in JSON format
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented
const edit = async (req, res, next) => {
  const { pseudo, email, description } = req.body;
  const updatedUtilisateur = {
    id: req.params.id,
    pseudo,
    email,
    description,
  };
  try {
    const existingUtilisateur = await tables.utilisateur.read(req.params.id);
    if (existingUtilisateur == null) {
      res.status(404).send("Utilisateur not found");
    } else {
      const result = await tables.utilisateur.update(updatedUtilisateur);
      res.status(200).json({ result });
    }
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the user data from the request body
  try {
    // Insert the user into the database
    const { pseudo, email, hashed_password } = req.body;
    const result = await tables.utilisateur.create({
      pseudo,
      email,
      hashed_password,
    });
    if (result) {
      const newUser = {
        id: result,
        pseudo,
        email,
        hashed_password,
      };

      const token = await jwt.sign(
        { sub: newUser.id },
        process.env.APP_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.status(201).json({
        token,
        pseudo: newUser.pseudo,
        email: newUser.email,
      });
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented
const destroy = async (req, res, next) => {
  // Extract the item data from the request body
  try {
    // Insert the item into the database
    const result = await tables.utilisateur.delete(req.params.id);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).send(result);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const getByToken = async (req, res) => {
  const userInfo = req.auth;

  try {
    if (userInfo && userInfo.sub) {
      const utilisateur = await tables.utilisateur.read(userInfo.sub);

      if (utilisateur == null) {
        res.sendStatus(404);
      } else {
        res.json(utilisateur);
      }
    } else {
      res.status(404).send("User not found. Auth doesn't exist");
    }
  } catch (e) {
    res.status(500).send(`Internal server error : ${e}`);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  getByToken,
};
