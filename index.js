import express from "express";
import bodyParser from "body-parser";
import pkg from "pg";
import cors from "cors";

const { Pool } = pkg;

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "bee",
  password: "arpan000",
  port: 5432,
});

// API endpoint for registration
app.post("/register", async (req, res) => {
  const formData = req.body;

  // Validation: Ensure all fields are present
  const requiredFields = [
    "username", "email", "password", "firstName", "lastName", "phone", "address", "city", "state", "zip", "country", "dob", "gender", "occupation", "company", "bio", "website", "social", "interests", "newsletter"
  ];

  for (const field of requiredFields) {
    if (!formData[field]) {
      return res.status(400).send(`${field} is required`);
    }
  }

  try {
    const query = `INSERT INTO users (${requiredFields.join(", ")}) VALUES (${requiredFields.map((_, idx) => `$${idx + 1}`).join(", ")})`;
    await pool.query(query, requiredFields.map((field) => formData[field]));
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving user to the database");
  }
});

// API endpoint to fetch all users
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");

    console.log("Users Information Called .... ")
    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving users from the database");
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
