'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');
const Forum = mongoose.model('Forum');

module.exports.findByHash = findTopicByHash;
module.exports.addTopic = addForumTopic;
module.exports.getTopics = getForumTopics;
module.exports.getTopic = getForumTopic;
module.exports.forum = forumPage;
module.exports.topic = topicPage;

function findTopicByHash(req, res, next) {
  Forum
  .findOne({ hash: req.params.hash })
  .populate('user')
  .exec(function(err, result) {
    if (err) {
      return next(err);
    } else if (result) {
      req.resources.topic = result;
      next();
    } else {
      // TODO: render 404 page
      res.status(404).send('Not found.');
    }
  });
}

function addForumTopic (req, res) {
  var data = _.pick(req.body, 'topic', 'category');
  data.user = req.user._id;

  console.log(data);

  Forum.create(data, function(err, result) {
    if (err) {
      return res.status(401).json({ message: "Couldn't create forum topic" });
    }

    res.json(result);
  });
}

function getForumTopics (req, res, next) {

  Forum.find(function(err, result) {
    if (err) {
      return next();
    }
    console.log("topic res", result)
    req.resources.topics = result;
    next();
  });
}

function getForumTopic (req, res, next) {
  var hash = req.params.hash;
  console.log('hash', hash);
  Forum
  .findOne({ hash: hash })
  .populate("comment")
  .exec(function(err, result) {
    if (err) {
      return next();
    }
    console.log("topic", result)
    req.resources.topic = result;
    next();
  });
}


function forumPage (req, res) {
  res.render('common/forum', {
    topics: req.resources.topics
  });
}

function topicPage (req, res) {
  console.log(req.resources.topic)
  res.render('common/forum-topic', {
    topic: req.resources.topic,
    comments: req.resources.comments
  });
}
