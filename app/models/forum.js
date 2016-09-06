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
    type:String
  },
  category: {
    type: String
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

Forum.createMapping({
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 0,
    "analysis":{
      "analyzer":{
        "autocomplete":{
          "type":"custom",
          "tokenizer":"standard",
          "filter":[ "standard", "lowercase", "stop", "kstem", "ngram" ]
        },
        "whitespace_analyzer": {
          "type": "custom",
          "tokenizer": "whitespace",
          "filter": ["lowercase"]
        }
      },
      "filter":{
        "ngram":{
          "type":"ngram",
          "min_gram":2,
          "max_gram":15
        }
      }
    }
  },
  "mappings": {
    "forum": {
      "_all": {
        "index_analyzer": "autocomplete",
        "search_analyzer": "autocomplete"
      },
      "properties": {
        "user":{
          "type": "string",
          "index": "no",
          "include_in_all": false
        },
        "hash":{
          "type": "string",
          "index": "no",
          "include_in_all": false
        },
        "comments":{
          "type": "string",
          "index": "no",
          "include_in_all": false
        },
        "topic":{
          "type": "string",
        },
        "category":{
          "type": "string",
        }
      }
    }
  }
},function(err, mapping){
  if(err){
    console.log('error creating mapping (you can safely ignore this)');
    //console.log(err);
  }else {
    console.log('mapping created!');
    console.log(mapping);
  }
});
module.exports = Forum;