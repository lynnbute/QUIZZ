import express from 'express';
import { connect } from './db.js';  // Your DB connection
import usersRoutes from './routes/users.js';  // Users route

const app = express();

app.use(express.json());  // Middleware for parsing JSON
app.use('/api/users', usersRoutes);  // Register routes with a prefix

const PORT = process.env.PORT || 5000;
connect();  // Database connection

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
