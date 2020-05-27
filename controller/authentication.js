var passport = require('passport');
var User = require('./../models/user');
const Sequelize = require('sequelize');
var sequelize = new Sequelize('webapp','abhinav','password',{
    host : "localhost",
    dialect : 'postgres',
    port: 12345
})


var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
  };


module.exports.register = function(req, res) {
    var user = User(sequelize,Sequelize);

    User.name = req.body.name;
    User.email = req.body.email;
    User.role = req.body.role;
    User.setPassword(req.body.password);

    User.create(function(err) {
    var token;
    token = User.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
  });

};

module.exports.login = function(req, res) {

    if(!req.body.email || !req.body.password) {
      sendJSONresponse(res, 400, {
        "message": "All fields required"
      });
      return;
    }
  
    passport.authenticate('local', function(err, user, info){
      var token;
  
      // If Passport throws/catches an error
      if (err) {
        res.status(404).json(err);
        return;
      }
  
      // If a user is found
      if(User){
        token = User.generateJwt();
        res.status(200);
        res.json({
          "token" : token
        });
        //res.redirect('/');
  
      } else {
        // If user is not found
        res.status(401).json(info);
      }
    })(req, res);
  
  };