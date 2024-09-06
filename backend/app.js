const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authenticateAdmin = require("./middleware/authenticateAdmin");
const questionRoutes = require("./routes/questionRoutes");
const adminRoutes = require("./routes/adminRoute");
const feedbackRoutes = require("./routes/feedbackRoutes");
const authRoutes = require("./routes/authRoutes");
const apiKeyRoutes = require("./routes/apiKeyRoutes");


const app = express();


const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['x-api-key', 'Authorization', 'Content-Type'],
};
app.use(cors(corsOptions));
app.use(express.json());

// Store the database connection in the app locals BEFORE routes
app.use(async (req, res, next) => {
  if (!app.get('db')) {
    try {
      const db = await connectDB();
      app.set('db', db);  // Store the database connection in app locals
    } catch (error) {
      return res.status(500).json({ message: 'Failed to connect to the database.' });
    }
  }
  next();
});

// Middleware for admin routes
//app.use('/admin', authenticateAdmin, adminRoutes);

// Load routes after DB middleware

app.get('/', (req, res) => {
  res.send('home');
});

app.use('/', authRoutes); 
app.use('/', questionRoutes);
//app.use('/', feedbackRoutes);
app.use('/', apiKeyRoutes );

module.exports = app;