import db_pool from "../database/db.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Request venit pt:", email);
    console.log("Parola:", password);

    const user = await db_pool.query(
      "SELECT * FROM auth_users WHERE email=$1",
      [email],
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.rows[0].password_hash !== password) {
      return res.status(401).json({ message: "Credentiale invalide" });
    }

    res.status(200).json(user.rows[0]);
  } catch (err) {
    console.log(err);
  }
};

const signUp = async (req, res) => {
  res.send("Test sign up");

  const response = await db_pool.query(
    "INSERT INTO auth_users (email, password_hash) VALUES ($1, $2) RETURNING user_id, email",
    [email, password],
  );
};

const getUser = async (req, res) => {
  try {
    const response = await db_pool.query("SELECT * FROM auth_users");

    console.log(response);

    res.status(200).json(response.rows[0]);
  } catch (err) {
    console.log(err);
  }
};

export { login, signUp, getUser };
