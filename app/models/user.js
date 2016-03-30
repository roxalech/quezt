'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
//var commonHelper = require('../helpers/common');

var UserSchema = new Schema({
  name : {
    type: String,
    required: true
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