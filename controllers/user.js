const User = require('../models/user');

module.exports.renderRegister = (req,res)=>{
    res.render('user/register');
}
module.exports.register = async (req,res)=>{
    try{
        const {email,username,password} = req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser,password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds');
        })
    }catch(e){
        req.flash('error',e.message);
        res.redirect('/register')
    }   
    
}
module.exports.renderLogin = (req,res)=>{
    res.render('user/login');
}
module.exports.login = (req, res) => {
    req.flash('success', 'welcome back!');
    console.log(req.session);
    const redirectUrl = req.session.returnTo || '/admin'
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}
module.exports.logout = (req,res)=>{
    req.logOut();
    req.flash('success',"Logged Out Successfully")
    res.redirect('/')
}