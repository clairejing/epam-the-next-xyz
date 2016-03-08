var express = require('express');
var router = express.Router();
var _ = require('underscore');

var mongoose = require('mongoose');

var Article = require('../models/ArticleSchema');
var Category = require('../models/CategorySchema');

router.get('/articles', function(req, res, next) {
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers","X-Request-With");
	Article.find({},null,{sort:{date:-1}}, function(err, data){
		res.json(data);
	});
});

router.get('/articles/:id', function(req, res, next) {
	Article.findById(req.params.id, function(err, data){
		if(!err){
			res.json(data);
		}
	});
});

router.get('/categories', function(req, res, next){
	Category.find({}, null, {sort:{date:-1}}, function(err, data){
		res.json(data);
	});
});

module.exports = router;