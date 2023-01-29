const User = require('../models/user');
module.exports.profile = function(req, res){
    // check if there is user id in cookies
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            // check if user id if found in db
            if(user){
                return res.render('user_profile', {
                    title: 'User Profile',
                    user: user
                });
            }
            // if user id is not there
            return res.redirect('/users/sign-in');  
        });
    }else{
        // if there is no user id in cookies
        return res.redirect('/users/sign-in');
    }
}

// actions
// render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    });
}

// render the sign in page
module.exports.signIn = function(req, res){
    // it renders from the views section
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
    // steps to autthenicate
    // find the user
    User.findOne({email:req.body.email}, function(err, user){
        if(err){console.log("Error in finding User in Signing In"); return;}
        // Handle user found
        if(user){
            // handle passwrond which doesn't match
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            // handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }else{
            // handle user not found
            return res.redirect('back');
        }
    });
}

// module.exports.endSession()