'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  name : {
    type: String
  },
  role: {
    type: String,
    default: 'user'
  },
  password: {
    type: String,
    select: false
  },
  passwordSalt: {
    type: String,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
//
//UserSchema.pre('save', function(next) {
//  //this.slug = commonHelper.createSlug(this.name);
//  next();
//});

/**
 * Find a user by it's email and checks the password againts the stored hash
 *
 * @param {String} email
 * @param {String password
 * @param {Function} callback
 */
UserSchema.statics.authenticate = function(email, password, callback) {
  this
  .findOne({ email: email })
  .select('+password +passwordSalt')
  .exec(function(err, user) {
    if (err) {
      return callback(err, null);
    }

    // no user found just return the empty user
    if (!user) {
      return callback(err, user);
    }

    // verify the password with the existing hash from the user
    passwordHelper.verify(password, user.password, user.passwordSalt,function (err, result) {
      if (err) {
        return callback(err, null);
      }

      // if password does not match don't return user
      if (result === false) {
        return callback(err, null);
      }

      // remove password and salt from the result
      user.password = undefined;
      user.passwordSalt = undefined;
      // return user if everything is ok
      callback(err, user);
    });
  });
};

module.exports = mongoose.model('User', UserSchema);