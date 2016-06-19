'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');
const Forum = mongoose.model('Forum');

module.exports.addTopic = addForumTopic;
module.exports.getTopics = getForumTopics;
module.exports.forum = forumPage;

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


function forumPage (req, res) {
  res.render('common/forum', {
    topics: req.resources.topics
  });
}
