const express = require('express');
const mongoose = require('mongoose').set('debug', true);
const path = require('path');
const config = require('config');
const fileUpload = require('express-fileupload');

const app = express();

// bodyparser Middleware
app.use(express.json());

// fileupload Middleware
app.use(fileUpload());

// DB Config
const db = config.get('mongoURI');

// Connect to to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB Connected ...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/items', require('./routes/api/items')); // Timer
app.use('/api/images', require('./routes/api/images')); // Images
app.use('/api/users', require('./routes/api/users')); //  Register
app.use('/api/auth', require('./routes/api/auth')); // Auth

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
