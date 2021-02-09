const Post = require('../models/post');
module.exports.home = function(req,res){
    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title: "Home",
    //         posts: posts
    //     });
    // });
    
    Post.find({user:req.user}).populate('user').exec(function(err,posts){
        // if(!req.isAuthenticated()){
        //     return res.render('home',{
        //         title: "Home",
        //         posts: []
        //     });
        // }
        // else{
            return res.render('home',{
                title: "Home",
                posts: posts
            });
        // }
        
    });
}