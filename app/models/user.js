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

module.exports = mongoose.model('User', UserSchema);