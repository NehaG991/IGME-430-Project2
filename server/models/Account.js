const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const saltRounds = 10;

let AccountModel = {};

const AccountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^[A-Za-z0-9_\-.]{1,16}$/,
  },
  unhashedPassword: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

AccountSchema.statics.toAPI = (doc) => ({
  username: doc.username,
  _id: doc._id,
});

AccountSchema.statics.generateHash = (password) => bcrypt.hash(password, saltRounds);

AccountSchema.statics.authenticate = async (username, password, callback) => {
  try {
    const doc = await AccountModel.findOne({ username }).exec();
    if (!doc) {
      return callback();
    }

    const match = await bcrypt.compare(password, doc.password);
    if (match) {
      return callback(null, doc);
    }
    return callback();
  } catch (err) {
    return callback(err);
  }
};

AccountSchema.statics.getUsername = (objectId, callback) => AccountModel.findOne({ _id: objectId }).select('username').lean().exec(callback);

AccountSchema.statics.getCurrentPassword = async (objectId) => {
  const doc = await AccountModel.findOne({ _id: objectId }).exec();
  return doc.unhashedPassword;
};

AccountSchema.statics.changePassword = async (objectId, unhashed, hashed) => {
  const filter = { _id: objectId };
  const update = { unhashedPassword: unhashed, password: hashed };

  const doc = await AccountModel.findOneAndUpdate(filter, update);

  return doc;
};

AccountModel = mongoose.model('Account', AccountSchema);
module.exports = AccountModel;
