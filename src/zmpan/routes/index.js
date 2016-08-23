exports.index = function(req, res) {
  res.render('index', { filename: 'index' });
};

exports.test =function(req, res) {
  res.render('abc');
}

exports.about =function(req, res) {
  res.render('about');
}
