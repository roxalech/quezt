'use strict';

const elasticsearch = require('elasticsearch');
const config = require('./index');

module.exports.init = initElasticsearch;

function initElasticsearch (app) {
  const elasticClient = new elasticsearch.Client({
    host: config.elasticsearch.url,
    log: 'info'
  });

  if(app) {
    app.set('esClient', elasticClient)
  }
  return elasticClient;
}

//not necessarily auto complete for add question thingy

//const elasticsearch = require('elasticsearch');
//const config = require('./index');
//
//const elasticClient = new elasticsearch.Client({
//  host: config.elasticsearch.url,
//  log: 'info'
//});
//
//var indexName = "randomindex";
//
///**
// * Delete an existing index
// */
//function deleteIndex() {
//  return elasticClient.indices.delete({
//    index: indexName
//  });
//}
//exports.deleteIndex = deleteIndex;
//
///**
// * create the index
// */
//function initIndex() {
//  return elasticClient.indices.create({
//    index: indexName
//  });
//}
//exports.initIndex = initIndex;
//
///**
// * check if the index exists
// */
//function indexExists() {
//  return elasticClient.indices.exists({
//    index: indexName
//  });
//}
//exports.indexExists = indexExists;