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

var QuestionSchema = new Schema({
  author: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  body : {
    type:String,
    es_indexed:true
  },
  answers: [
    {
      body: {
        type: String
      },
      index: {
        type: String
      },
      correct: {
        type: Boolean,
        select: false
      }
    }
  ],
  answerType: {
    type: String,
    default: 'single-choice'
  },
  category: {
    type:String,
    es_indexed:true
  },
  difficulty : {
    type:String,
    es_indexed:true
  }
});

QuestionSchema.plugin(mongoosastic, {
  esClient: esClient
});

var Question = mongoose.model('Question', QuestionSchema);

//Question.createMapping({
//  "settings": {
//    "analysis": {
//      "filter": {
//        "edge_ngram_filter": {
//          "type": "edge_ngram",
//            "min_gram": 2,
//            "max_gram": 20
//        }
//      },
//      "analyzer": {
//        "edge_ngram_analyzer": {
//          "type": "custom",
//            "tokenizer": "standard",
//            "filter": [
//            "lowercase",
//            "edge_ngram_filter"
//          ]
//        }
//      }
//    }
//  },
//  "mappings": {
//  "doc": {
//    "properties": {
//      "text_field": {
//        "type": "string",
//          "index_analyzer": "edge_ngram_analyzer",
//          "search_analyzer": "standard"
//      }
//    }
//  }
//},function(err, mapping){
//  if(err){
//    console.log('error creating mapping (you can safely ignore this)');
//    console.log(err);
//  }else{
//    console.log('mapping created!');
//    console.log(mapping);
//  }
//});

//module.exports = Question;
