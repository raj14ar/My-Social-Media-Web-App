const { connect } = require('mongoose');
const User = require('../models/users');

module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title: 'Profile'
    });
}
module.exports.post = function(req,res){
    return res.render('user_post',{
        title: 'Post'
    });
}
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: "Sign up"

    });
}
module.exports.signIn = function(req, res){
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
}