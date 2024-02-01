const AbstractManager = require("./AbstractManager");

class dinoManager extends AbstractManager {
  constructor() {
    super({ table: "dinosaures" });
  }

  // The C of CRUD - Create operation
  async insert(
    name,
    type,
    periode,
    poid,
    taille,
    repartition,
    description,
    userId,
    image
  ) {
    return this.database.query(
      `INSERT INTO ${this.table} (name, type, periode, poid, taille, repartition, description, utilisateur_id, image) VALUES (?,?,?,?,?,?,?,?,?)`,
      [
        name,
        type,
        periode,
        poid,
        taille,
        repartition,
        description,
        userId,
        image,
      ]
    );
  }

  async create({
    name,
    type,
    periode,
    poid,
    taille,
    repartition,
    description,
    image,
  }) {
    const [result] = await this.database.query(
      `insert into ${this.table} (name, type,
        periode,
        poid,
        taille,
        repartition,
        description,
        image ) values (?,?,?,?,?,?,?,?)`,
      [name, type, periode, poid, taille, repartition, description, image]
    );
    return result;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    const [result] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );
    return result;
  }

  async readAll() {
    const [result] = await this.database.query(`select * from ${this.table}`);
    return result;
  }

  // The U of CRUD - Update operation

  async update({
    id,
    name,
    type,
    periode,
    poid,
    taille,
    repartition,
    description,
  }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name=?, type=?, periode=?, poid=?, taille=?, repartition=?, description=? WHERE id=?`,
      [name, type, periode, poid, taille, repartition, description, id]
    );
    return result;
  }

  // The D of CRUD - Delete operation

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE from ${this.table} where id = ?`,
      [id]
    );
    return result;
  }

  async readByUserId(userId) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE utilisateur_id = ? `,
      [userId]
    );
    return rows;
  }
}

module.exports = dinoManager;
