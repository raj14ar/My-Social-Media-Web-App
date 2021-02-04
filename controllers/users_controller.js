
module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title: 'User/Profile'
    });
}
module.exports.post = function(req,res){
    return res.render('user_post',{
        title: 'User/Post'
    });
}