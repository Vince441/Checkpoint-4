const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const tables = require("../tables");



const login = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided email
    const user = await tables.utilisateur.getByPseudo(req.body.pseudo);

    if (!user[0]) {
      res.sendStatus(400).send("Incorrect pseudo or password");
      return;
    }

    const verified = await argon2.verify(
      user[0].hashed_password,
      req.body.password
    );

    if (verified) {
      // Respond with the user in JSON format (but without the hashed password)
      delete user[0].hashed_password;

      const token = await jwt.sign(
        { sub: user[0].id },
        process.env.APP_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.json({
        token,
        user: user[0],
      });
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

module.exports = {
  login,
};
