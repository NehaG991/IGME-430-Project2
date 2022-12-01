const models = require('../models');

const { Account } = models;
const { Tweet } = models;

// Renders pre login home page
const loginPage = (req, res) => res.render('login', { csrfToken: req.csrfToken() });

// Handles login
const login = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;

  if (!username || !pass) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password!' });
    }

    req.session.account = Account.toAPI(account);

    return res.json({ redirect: '/app' });
  });
};

// Handles signin
const signup = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match!' });
  }

  try {
    const hash = await Account.generateHash(pass);
    const newAccount = new Account({ username, unhashedPassword: pass, password: hash });
    await newAccount.save();
    req.session.account = Account.toAPI(newAccount);
    return res.json({ redirect: '/app' });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username already in use' });
    }
    return res.status(400).json({ error: 'An error occurred' });
  }
};

// Handles logout
const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

// Gets csrf token
const getToken = (req, res) => res.json({ csrfToken: req.csrfToken() });

// Gets username of currently logged in user
const getUsername = (req, res) => {
  Account.getUsername(req.session.account._id, (err, doc) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'Issue with GetUsername' });
    }

    return res.json({ username: doc });
  });
};

// Handles password change
const changePassword = async (req, res) => {
  const newPass = `${req.body.newPass}`;
  const newPass2 = `${req.body.newPass2}`;

  if (!newPass || !newPass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if (newPass !== newPass2) {
    return res.status(400).json({ error: 'New passwords do not match!' });
  }

  const oldPassword = await Account.getCurrentPassword(req.session.account._id);
  console.log(oldPassword);
  const newPassHash = await Account.generateHash(newPass);

  if (oldPassword === newPass) {
    return res.status(400).json({ error: 'Old Password and New Password match' });
  }

  await Account.changePassword(req.session.account._id, newPass, newPassHash);

  return res.status(200).json({ error: 'Password successfully updated' });
};

const changeUsername = async (req, res) => {
  const newUsername = `${req.body.newUsername}`;
  const oldUsername = `${req.body.oldUsername}`;

  if (!newUsername) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  try{
    await Account.changeUsername(req.session.account._id, newUsername);
    console.log('USERNAME UPDATED');
    await Tweet.updateUsername(oldUsername, newUsername);
    console.log('TWEET USERNAME UPDATED');
    return res.status(200).json({ error: 'Username successfully updated' });
  } catch (err){
    console.log(err);
    return res.status(400).json({ error: 'An error has occured!' });
  }

};

module.exports = {
  loginPage,
  login,
  signup,
  logout,
  getToken,
  getUsername,
  changePassword,
  changeUsername,
};
