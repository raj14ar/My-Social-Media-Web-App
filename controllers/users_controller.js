const { connect } = require('mongoose');
const User = require('../models/users');

module.exports.profile = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(err){
                console.log("Error in displaying user");
                return;
            }
            if(user){
                return res.render('user_profile',{
                    title: 'Profile',
                    name: user.name,
                    email: user.email
                });
            }
            res.clearCookie('user_id');
            return res.redirect('/users/signin');

        });
    }
    else{
        return res.redirect('/users/signin');
    }
    
}
module.exports.post = function(req,res){
    return res.render('user_post',{
        title: 'Post'
    });
}
module.exports.signUp = function(req,res){
    //handle already signed in
    if(req.cookies.user_id){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: "Sign up"

    });
}
module.exports.signIn = function(req, res){
    //handle already signed in
    if(req.cookies.user_id){
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
    //find user
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log("Erron in finding user for sign in");
            return;
        }
        //handle user found
        if(user){
            if(user.password!=req.body.password){
                
                // handle password mismatch which dont't match
                console.log("Wrong Password");
                return res.redirect('back');
            }
            // handle session creation
                console.log("login sucessfully");
                res.cookie('user_id',user.id);
                return res.redirect('/users/profile');
            
        }
        else{
            //handle user not found
            console.log("User not found")
            return res.redirect('back');
        }
    });
}
module.exports.signOut = function(req, res){
    //handle already signed in
    if(req.cookies.user_id){
        res.clearCookie('user_id');
    }
    return res.redirect('/users/signin')
}