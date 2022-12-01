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
  username: {
    type: String,
    required: true,
    trim: true,
    match: /^[A-Za-z0-9_\-.]{1,16}$/,
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

  return TweetModel.find(search).select('tweet username').lean().exec(callback);
};

TweetSchema.statics.findTweet = (filter, callback) => TweetModel.find(filter).select('tweet private username createdDate').lean().exec(callback);

TweetSchema.statics.togglePrivacy = async (filter) => {
  const doc = await TweetModel.updateOne(filter, [{ $set: { private: { $eq: [false, '$private'] } } }]);

  return doc;
};

TweetSchema.statics.editTweet = async (filter, newTweet) => {
  const update = {tweet: newTweet};
  const doc = await TweetModel.updateOne(filter, update);

  return doc;
}

TweetModel = mongoose.model('Tweet', TweetSchema);

module.exports = TweetModel;
