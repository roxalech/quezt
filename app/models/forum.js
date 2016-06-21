'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const shortId = require('shortid');

const elasticsearch = require('elasticsearch');
const mongoosastic = require('mongoosastic');
const esClient =  new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'info'
});

var ForumSchema = new Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  hash: {
    type: String,
    unique: true,
    default: function() {
      return shortId.generate();
    }
  },
  topic : {
    type:String,
    es_indexed:true
  },
  category: {
    type: String,
    es_indexed: true
  },
  comments: {
    type: Number,
    default: 0
  }
});

ForumSchema.plugin(mongoosastic, {
  esClient: esClient
});

var Forum = mongoose.model('Forum', ForumSchema);