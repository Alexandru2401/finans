import db_pool from "../database/db.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Request venit pt:", email);
    console.log("Parola:", password);

    const response = await db_pool.query(
      "INSERT INTO auth_users (email, password_hash) VALUES ($1, $2) RETURNING user_id, email",
      [email, password],
    );
    res.status(201).json(response.rows[0]);
  } catch (err) {
    console.log(err);
  }
};

const signUp = async (req, res) => {
  res.send("Test sign up");
};

export { login, signUp };
