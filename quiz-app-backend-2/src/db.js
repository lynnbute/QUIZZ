import dotenv from 'dotenv';
import pkg from 'pg';

// Load environment variables from .env file
dotenv.config();

const { Client } = pkg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

// Connect to the database
const connect = async () => {
  try {
    await client.connect();
    console.log('Connected to the PostgreSQL database');
  } catch (err) {
    console.error('Error connecting to the database', err.stack);
  }
};

export { connect, client };
