var express = require('express');
var router = express.Router();
var _ = require('underscore');


// note that typically data would NOT be loaded from the filesystem in this manner :)

var mongoose = require('mongoose');
var Article = mongoose.model('Article');

router.get('/articles', function(req, res, next) {

	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers","X-Request-With");
	Article.find({},null,{sort:{date:-1}},function(err,data){
		console.log(data);
		res.json(data);
	});
});

router.get('/articles/:id', function(req, res, next) {
	console.log(req.params.id);
	Article.findById(req.params.id, function(err, data){
		if(!err){
			res.json(data);
		}
	});
});

module.exports = router;