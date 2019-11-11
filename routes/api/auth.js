/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const router = express.Router();

// User Model
const User = require('../../models/User');

// @route POST api/auth
// @desc Auth new user
// @access Public

router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Guetto validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: 'Incorrect Credential' });

    // Validate password
    bcrypt.compare(password, user.password).then(matched => {
      if (!matched)
        return res.status(400).json({ msg: 'Incorrect Credential' });

      jwt.sign(
        { id: user.id },
        config.get('jwtSecret'),
        {
          expiresIn: 86400
        },
        (err, token) => {
          if (err) throw err;

          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          });
        }
      );
    });
  });
});

// @route GET api/auth/user
// @desc Get user data
// @access Private

router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

module.exports = router;
