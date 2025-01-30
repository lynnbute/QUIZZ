import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { client } from '../db.js'; // Correctly import the PostgreSQL client

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await client.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, hashedPassword]
    );

    res.status(201).json({
      message: 'User created successfully!',
      user: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

// Get a user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await client.query('SELECT id, username, email FROM users WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};

// Update a user by ID
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    let hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    const query = `
      UPDATE users
      SET 
        username = COALESCE($1, username), 
        email = COALESCE($2, email), 
        password = COALESCE($3, password)
      WHERE id = $4
      RETURNING id, username, email
    `;

    const values = [username, email, hashedPassword, id];

    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User updated successfully', user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await client.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};
