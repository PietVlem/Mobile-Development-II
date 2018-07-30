const User = require('../models/user');
const passport = require('passport');
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/index');

signToken = user => {
  return JWT.sign({
    iss: 'CodeWorkr',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRET);
}

/* Local Login */
exports.user_auth_local_signUp = async function (req, res, next) {
  const { email, password } = req.value.body;

  // Check if there is a user with the same email
  const foundUser = await User.findOne({ "local.email": email });
  if (foundUser) {
    return res.status(403).json({ error: 'Email is already in use' });
  }

  // Create a new user
  const newUser = new User({
    method: 'local',
    local: {
      email: email,
      password: password
    }
  });

  await newUser.save();

  // Generate the token
  const token = signToken(newUser);
  // Respond with token
  res.status(200).json({ token });
}

exports.user_auth_local_signIn = function (req, res, next) {
  // Generate token
  const token = signToken(req.body);
  res.status(200).json({ token });
}

/* Facebook Login */
exports.user_auth_facebook_post = function (req, res, next) {
  // Generate token
  const token = signToken(req.user);
  res.status(200).json([token]);
}

/* Google Login */
exports.user_auth_google_post = function (req, res, next) {
  // Generate token
  const token = signToken(req.user);
  res.status(200).json({ token });
}

exports.secret = function (req, res, next) {
  console.log('I managed to get here!');
  res.json({ secret: "resource" });
}