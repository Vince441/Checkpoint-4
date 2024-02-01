const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const Dinos = await tables.dinosaures.readAll();
    res.json(Dinos);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const Dinosaures = await tables.dinosaures.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (Dinosaures == null) {
      res.sendStatus(404);
    } else {
      res.json(Dinosaures);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit = async (req, res, next) => {
  const { name, type, periode, poid, taille, repartition, description } =
    req.body;

  const updatedDino = {
    id: req.params.id,
    name,
    type,
    periode,
    poid,
    taille,
    repartition,
    description,
  };
  try {
    const result = await tables.dinosaures.update(updatedDino);
    if (result.affectedRows > 0) {
      res.status(200).json(updatedDino);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  // Extract the item data from the request body
  const Dino = {
    name: req.body.name,
    type: req.body.type,
    periode: req.body.periode,
    poid: req.body.poid,
    taille: req.body.taille,
    repartition: req.body.repartition,
    description: req.body.description,
    utilisateur_id: req.body.utilisateur_id,
  };

  try {
    // Insert the item into the database
    const insertId = await tables.dinosaures.create(Dino);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const destroy = async (req, res, next) => {
  // Extract the item data from the request body
  try {
    const result = await tables.dinosaures.delete(req.params.id);
    res.status(201).send(result);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const getUploadImage = async (req, res, next) => {
  try {
    const [result] = await tables.dinosaures.insert(
      req.body.name,
      req.body.type,
      req.body.periode,
      req.body.poid,
      req.body.taille,
      req.body.repartition,
      req.body.description,
      req.body.userId,
      `/images/Dino/${req.body.url}`
    );
    if (result.affectedRows) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const readByUserId = async (req, res, next) => {
  try {
    const result = await tables.dinosaures.readByUserId(req.params.id);
    if (result.length > 0) {
      res.status(200).send(result);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  getUploadImage,
  readByUserId,
};
