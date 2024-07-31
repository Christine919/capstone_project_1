import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cors from 'cors';
import pkg from 'pg';
import session from 'express-session';

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

// Set up sessions
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// PostgreSQL client setup
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'portfolio',
  password: 'Geok0323',
  port: 5432,
});

client.connect();

// Middleware to protect dashboard route
const requireLogin = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login.html');
  }
};

// Routes
app.get("/", (req, res) => {
  res.render('index');
});

app.get('/project', (req, res) => {
  res.render('project');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/about', (req, res) => {
  res.render('about');
});

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

// Route to get submissions
app.get('/submissions', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM contact ORDER BY inquiry_date DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// Route to serve login page
app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// Route to handle login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // For demonstration purposes, a single hard-coded user
  const user = {
    username: 'chris',
    password: 'Geok0323'
  };

  if (username === user.username && password === user.password) {
    req.session.user = user;
    res.redirect('/dashboard');
  } else if (username !== user.username && password !== user.password) {
    res.render('login', { error: 'Who are you?' });
  } else if (username !== user.username) {
    res.render('login', { error: 'Wrong username' });
  } else if (password !== user.password) {
    res.render('login', { error: 'Wrong password' });
  }
});

// Route to handle logout
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Failed to logout');
    }
    res.redirect('/login');
  });
});

// Route to serve dashboard with login check
app.get('/dashboard', requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Route to mark a submission as read
app.put('/mark-read/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    await client.query('UPDATE contact SET is_read = true WHERE id = $1', [id]);
    res.status(200).json({ message: 'Submission marked as read.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to mark submission as read.' });
  }
});

// Route to mark a submission as unread
app.put('/mark-unread/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    await client.query('UPDATE contact SET is_read = false WHERE id = $1', [id]);
    res.status(200).json({ message: 'Submission marked as unread.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to mark submission as unread.' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});