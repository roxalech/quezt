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
  body : {type:String, es_indexed:true},
  answers: [
    {
      body: {
        type: String
      },
      index: {
        type: String
      }
    }
  ],
  answerType: {
    type: String,
    default: 'single-choice'
  },
  correct: {
    type: String
  },
  category: {type:String, es_indexed:true},
  difficulty : {type:String, es_indexed:true}
});

QuestionSchema.plugin(mongoosastic, {
  esClient: esClient
});

var Question = mongoose.model('Question', QuestionSchema);

//Question.createMapping({
//  "analysis" : {
//    "analyzer":{
//      "content":{
//        "type":"custom",
//        "tokenizer":"whitespace"
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
