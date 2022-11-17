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
  name: doc.name,
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

AccountSchema.statics.getUsername = (objectId, callback) => {
  // try {
  //   const doc = await AccountModel.findOne({ _id: objectId }).exec();
  //   if (!doc) {
  //     return callback();
  //   }
  //   // console.log('Account model file');
  //   // console.log(doc);
  //   return callback();
  // } catch (err) {
  //   return callback(err);
  // }
    
    return AccountModel.findOne({ _id: objectId }).select('username').lean().exec(callback);
  
};

AccountModel = mongoose.model('Account', AccountSchema);
module.exports = AccountModel;
