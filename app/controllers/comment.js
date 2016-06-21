'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var Forum = mongoose.model('Forum');

module.exports.getAll = getAllComments;
module.exports.create = createComment;
module.exports.delete = deleteComment;

function getAllComments(req, res, next) {
  var hash = req.params.hash;

  Comment
  .find({ topicHash: hash })
  .populate('user')
  .sort({'createdAt': 1})
  .exec(function(err, comments) {
    if (err) {
      return next(err);
    }
    console.log('comments',comments);
    req.resources.comments = comments;
    next();
  });
}

function createComment(req, res, next) {
  var topic = req.resources.topic;
  var data = _.pick(req.body, 'body');
  data.topicHash = topic.hash;
  data.topic = topic._id;
  data.user = req.user._id;
console.log('data', data);

  Comment.create(data, function(err, result) {
    if (err) {
      return next(err);
    }

    Forum.update({ hash: topic.hash }, { $inc: { comments: 1 } }, function(err, forumRes) {
      if (err) {
        return next(err);
      }

      //var final = comment.toObject();
      //final.user = req.user;
      res.json(result);
    });
  });
}

function deleteComment(req, res, next) {
  var comment = req.resources.comment;

  Comment
  .remove({_id: comment._id}, function(err, result) {
    if (err) {
      return next(err);
    }

    Forum
    .update({hash: req.resources.post.hash }, {$inc: { comments: -1}})
    .exec(function(err, result) {
      if (err) {
        return next(err);
      }
      next();
    });
  });
}
