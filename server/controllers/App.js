const models = require('../models');

const { Tweet } = models;

// Renders app page
const appPage = (req, res) => res.render('app', { csrfToken: req.csrfToken() });

// Renders error page
const errorPage = (req, res) => res.status(404).render('404', { csrfToken: req.csrfToken() });

// Handles making tweet
const makeTweet = async (req, res) => {
  if (!req.body.tweet) {
    return res.status(400).json({ error: 'You must type something' });
  }

  const tweetData = {
    tweet: req.body.tweet,
    private: req.body.privacy,
    username: req.body.username,
    owner: req.session.account._id,
  };

  try {
    const newTweet = new Tweet(tweetData);
    await newTweet.save();
    return res.status(201).json({
      tweet: newTweet.tweet,
      private: newTweet.private,
      username: newTweet.username,
    });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Tweet already exists' });
    }
    return res.status(400).json({ error: 'An error occured' });
  }
};

// Gets tweets if user is logged in
const getLogInTweets = (req, res) => {
  const filter = { $or: [{ owner: req.session.account._id }, { private: false }] };
  Tweet.findTweet(filter, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'Issue with Get Log In Tweets' });
    }

    return res.json({ tweets: docs });
  });
};

// Gets tweets if no one is logged in
const getPublicTweets = (req, res) => {
  const filter = { private: false };
  Tweet.findTweet(filter, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'Issue with Get Log In Tweets' });
    }

    return res.json({ tweets: docs });
  });
};

// Handles deleting tweets
const deleteTweet = async (req, res) => {
  try {
    await Tweet.deleteOne({ _id: req.body._id });
    console.log('TWEET DELETED');
    return res.status(200).json({ _id: req.body._id });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error has occured!' });
  }
};

// Handles toggling privacy
const togglePrivacy = async (req, res) => {
  try {
    const filter = { _id: req.body._id };
    await Tweet.togglePrivacy(filter);
    console.log('TWEET PRIVACY UPDATED');
    return res.status(200).json({ _id: req.body._id });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error has occured!' });
  }
};

// Handles Editing tweet
const editTweet = async (req, res) => {
  try {
    const filter = { _id: req.body._id };
    await Tweet.editTweet(filter, req.body.newTweet);
    console.log('TWEET UPDATED');
    return res.status(200).json({ _id: req.body._id });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error has occured!' });
  }
};

module.exports = {
  appPage,
  errorPage,
  makeTweet,
  getLogInTweets,
  getPublicTweets,
  deleteTweet,
  togglePrivacy,
  editTweet,
};
