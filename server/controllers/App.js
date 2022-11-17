const models = require('../models');

const { Tweet } = models;

const appPage = (req, res) => res.render('app', { csrfToken: req.csrfToken() });

const errorPage = (req, res) => res.status(404).render('404', { csrfToken: req.csrfToken() });

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

module.exports = {
  appPage,
  errorPage,
  makeTweet,
  getLogInTweets,
  getPublicTweets,
};
