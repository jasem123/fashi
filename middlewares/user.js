
function user(req , res ,next) {
    if (req.session.passport) {
        next();
    }else{
        res.redirect('/login');
    }
}

module.exports = user;