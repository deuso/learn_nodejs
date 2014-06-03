var express = require('express');
var router = express.Router();

var crypto = require('crypto'),
	User = require('../models/user.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
  	title: 'Home',
  	user: req.session.user,
  	success: req.flash('success').toString(),
  	error: req.flash('error').toString()
  });
});

//Register
router.get('/reg', checkNotLogin);
router.get('/reg', function(req, res) {
  res.render('reg', { 
  	title: 'Register',
  	user: req.session.user,
  	success: req.flash('success').toString(),
  	error: req.flash('error').toString()
  });
});
router.post('/reg', checkNotLogin);
router.post('/reg', function(req, res){
	var name = req.body.name,
		password = req.body.password,
		re_password = req.body['re-password'];
	if(re_password != password) {
		req.flash('error', "Not same password");
		return res.redirect('/reg');
	}

	var md5 = crypto.createHash('md5'),
		password = md5.update(req.body.password).digest('hex');
	var newUser = new User({
		name: req.body.name,
		password: password,
		email: req.body.email
	});
	User.get(newUser.name, function(err, user) {
		if(user) {
			req.flash('error', 'User already exsists');
			return res.redirect('/reg');
		}
		newUser.save(function(err, user) {
			if(err) {
				req.flash('error', err);
				res.redirect('/reg');
			}
			req.session.user = user;
			req.flash('success', 'Registing done');
			res.redirect('/');
		});
	});
});

//Login 
router.get('/login', checkNotLogin);
router.get('/login', function(req, res) {
	res.render('login', {
		title: 'Login',
		user: req.session.user,
	  	success: req.flash('success').toString(),
	  	error: req.flash('error').toString()
	});
});
router.post('/login', checkNotLogin);
router.post('/login', function(req, res){
	var md5 = crypto.createHash('md5'),
		password = md5.update(req.body.password).digest('hex');
	User.get(req.body.name, function(err, user) {
		if(!user) {
			req.flash('error', 'User doesn\'t exsists');
			return res.redirect('/login');
		}
		if(user.password != password) {
			req.flash('error', 'Password error');
			return res.redirect('/login');
		}
		req.session.user = user;
		req.flash('success', user.name + ' login success');
		res.redirect('/');
	});
});

//Post a blog
router.get('/post', checkLogin);
router.get('/post', function(req, res) {
	res.render('post', {
		title: 'Post',
		user: req.session.user,
	  	success: req.flash('success').toString(),
	  	error: req.flash('error').toString()
	});
});
router.post('/post', checkLogin);
router.post('/post', function(req, res){});

//Log out
router.get('/logout', checkLogin);
router.get('/logout', function(req, res){
	req.flash('success', req.session.user.name + ' logout success');
	req.session.user = null;
	res.redirect('/');
});


//util funcs
function checkLogin(req, res, next) {
	if(!req.session.user) {
		req.flash('err', 'Not Logged in');
		res.redirect('/login');
	}
	next();
}
function checkNotLogin(req, res, next) {
	if(req.session.user) {
		req.flash('err', 'Already Logged in');
		res.redirect('back');
	}
	next();
}
module.exports = router;
