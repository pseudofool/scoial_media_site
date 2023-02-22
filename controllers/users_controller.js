const User = require('../models/user');
module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    });
}

// actions
// render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    });
}

// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render("user_sign_in",{
        title: "Codeial | Sign In"
    });
}

module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email}, function(err, user){
        if(err){console.log("Error in finding User for Sign Up"); return;}
        if(!user){
            User.create(req.body, function(err, user){
                if(err){console.log("Error in Signing Up"); return;}
                
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    });

}

module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    // newer version require call back function
    req.logout(function(err){
        if(err){
            console.log("Cannot log out", err);
            return res.redirect('/');
        }
        return res.redirect('/');
    });
}