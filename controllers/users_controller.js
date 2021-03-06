const { connect } = require('mongoose');
const Post = require('../models/post');
const User = require('../models/users');

module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title: 'Profile'
    });
}
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: "Sign up"

    });
}
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title: 'Sign In'
    })
}
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log("Error in finding user in sign up");
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log("Error in creating user while signing up");
                    return;
                }
                return res.redirect('/users/signin');
            })
        }
        else{
            return res.redirect('back');
        }
    });
}
module.exports.createSession = function(req,res){
    //to do 
    return res.redirect('/');
}
module.exports.destroySession = function(req,res){
    req.logout();
   return res.redirect('/');
}
