var express = require('express');
var router = express.Router();
var _ = require('underscore');

// var exphbs  = require('express-handlebars');
// var hbs = exphbs.create({defaultLayout: 'main'});
// router.engine('handlebars', hbs.engine);
// router.set('view engine', 'handlebars');

// note that typically data would NOT be loaded from the filesystem in this manner :)

router.get('/articles', function(req, res, next) {

	var fs = require('fs');
	var obj;
	fs.readFile('./data/articles.json', 'utf8', function (err, data) {
	  if (err) throw err;
	  res.json(JSON.parse(data));
	});
});

router.get('/articles/:id', function(req, res, next) {
	debugger
	console.log(req.params.id);
	// res.send("Welcome id");
	var fs = require('fs');
	var obj;
	fs.readFile('./data/articles.json', 'utf8', function (err, data) {
		if (err) throw err;

		data = _.filter(JSON.parse(data), function(item) {
		    return item.id == req.params.id;
		});

		res.render('article',data[0]);
	});
});

module.exports = router;