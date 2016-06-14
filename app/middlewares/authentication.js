'use strict';

module.exports.ensured = ensureAuthenticated;

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log(req.isAuthenticated());
    return next();
  }

  delete req.session.redirect;
  //res.redirect('/signin');
  res.format({
    html: function() {
      res.redirect('/signin');
    },
    text: function() {
      res.redirect('/signin');
    },
    json: function() {
      res.status(401).json({ message: 'Unauthorized' });
    }
  });
};