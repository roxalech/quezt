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
  content : {
    type:String
  },
  //answers: [
  //  {
  //    body: {
  //      type: String
  //    },
  //    index: {
  //      type: String
  //    },
  //    correct: {
  //      type: Boolean,
  //      select: false
  //    }
  //  }
  //],
  answersType: {
    type: String,
    default: 'single choice'
  },
  categories: {
    type:String
  },
  categories_suggest: {
    type:String,
    es_type:'completion'
  },
  difficultyLvl : {
    type:String
  }
});

QuestionSchema.plugin(mongoosastic, {
  esClient: esClient
});

var Question = mongoose.model('Question', QuestionSchema);

Question.createMapping({
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 0,
    "analysis": {
      "filter": {
        "edge_ngram_filter": {
          "type": "edge_ngram",
          "min_gram": 2,
          "max_gram": 15,
          "token_chars": [
            "letter",
            "digit",
            "punctuation"
          ]
        },
        "nGram_filter": {
          "type": "nGram",
          "min_gram": 2,
          "max_gram": 20,
          "token_chars": [
            "letter",
            "digit",
            "punctuation",
          ]
        },
        "my_stopwords": {
          "type":       "stop",
          "stopwords": [ "the", "a" ]
        }
      },
      "analyzer": {
        "edge_ngram_analyzer": {
          "type": "custom",
          "tokenizer": "whitespace",
          "filter": [
            "lowercase",
            "edge_ngram_filter",
            "my_stopwords"
          ]
        },
        "nGram_analyzer": {
          "type": "custom",
          "tokenizer": "whitespace",
          "filter": [
            "lowercase",
            "nGram_filter"
          ]
        },
        "whitespace_analyzer": {
          "type": "custom",
          "tokenizer": "whitespace",
          "filter": [
            "lowercase",
            "my_stopwords"
          ]
        },
        "body_analyzer": {
          "type": "custom",
          "char_filter": [ "html_strip" ],
          "tokenizer": "standard",
          "filter": [
            "lowercase",
            "my_stopwords"
          ]
        }
      }
    }
  },
  "mappings": {
    "question": {
      "properties": {
        "content": {
          "type": "string",
          "analyzer": "body_analyzer",
          "search_analyzer": "whitespace_analyzer"
        },
        "categories_suggest": {
          "type": "completion",
          "index_analyzer": "simple",
          "search_analyzer": "simple",
          "payloads": false
        },
        "difficultyLvl": {
          "type": "string",
          "analyzer": "edge_ngram_analyzer",
          "search_analyzer": "whitespace_analyzer"
        },
        "answersType": {
          "type": "string",
          "analyzer": "nGram_analyzer",
          "search_analyzer": "whitespace_analyzer"
        }
      }
    }
  }
},function(err, mapping){
  if(err){
    console.log('error creating mapping (you can safely ignore this)');
    //console.log(err);
  }else{
    console.log('mapping created!');
    //console.log(mapping);
  }
});

module.exports = Question;