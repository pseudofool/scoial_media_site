module.exports.home = function(req, res){
    // print cookie in console
    console.log(req.cookies);
    // alter the cookie
    // res.cookie('id', 23);
    return res.render('home', {
        title: "Home"
    });
}