const models = require('../models');

const { Account } = models;

// Renders pre login home page
const loginPage = (req, res) => res.render('login', { csrfToken: req.csrfToken() });

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
    const newAccount = new Account({ username, password: hash });
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

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const getToken = (req, res) => res.json({ csrfToken: req.csrfToken() });

const getUsername = (req, res) => {
  Account.getUsername(req.session.account._id, (err, doc) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'Issue with GetUsername' });
    }

    return res.json({ username: doc });
  });
};

module.exports = {
  loginPage,
  login,
  signup,
  logout,
  getToken,
  getUsername,
};
