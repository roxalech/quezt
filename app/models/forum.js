'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

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
  topic : {
    type: {
      type:String,
      es_indexed:true
    }
  },
  category: {
    type: {
      type: String,
      es_indexed: true
    }
  }
});

ForumSchema.plugin(mongoosastic, {
  esClient: esClient
});

var Forum = mongoose.model('Forum', ForumSchema);