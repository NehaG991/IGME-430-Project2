const mongoose = require('mongoose');
const _ = require('underscore');

let TweetModel = {};

const setTweet = (tweet) => _.escape(tweet).trim();

const TweetSchema = new mongoose.Schema({
  tweet: {
    type: String,
    required: true,
    trim: true,
    set: setTweet,
    maxLength: 280,
  },
  private: {
    type: Boolean,
    required: true,
    default: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

TweetSchema.statics.toAPI = (doc) => ({
  tweet: doc.tweet,
  private: doc.private,
});

TweetSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: mongoose.Types.ObjectId(ownerId),
  };

  return TweetModel.find(search).select('tweet').lean().exec(callback);
};

TweetSchema.statics.findTweet = (filter, callback) => TweetModel.find(filter).select('tweet private').lean().exec(callback);

TweetModel = mongoose.model('Tweet', TweetSchema);

module.exports = TweetModel;
