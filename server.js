import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cors from 'cors';
import pkg from 'pg';

const { Client } = pkg;

const app = express();

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", ( req, res ) => {
  res.sendFile(__dirname + "/public/index.html");
});

// PostgreSQL client setup
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'portfolio',
  password: 'Geok0323',
  port: 5432,
});

client.connect();

// Route to handle form submissions
app.post('/contact', async (req, res) => {
  const { fname, lname, email, phonenum, inquiry } = req.body;

  try {
    const result = await client.query(
      'INSERT INTO contact (fname, lname, email, phonenum, inquiry) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [fname, lname, email, phonenum, inquiry]
    );
    res.status(200).json({ message: 'Thank you for contacting me!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});


