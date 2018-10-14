const passport = require('passport');
const crypto = require('crypto');
const keys = require('../config/keys');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Accounts = mongoose.model('accounts');
passport.serializeUser((acccount,done)=>{
    done(null,acccount.id);
});
passport.deserializeUser((id,done)=>{
    Accounts.findById(id,(err,acccount)=>{
        done(err,acccount);
    });
})

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },(username,password,done)=>{
    //console.log(accessToken);
    Accounts.findOne({email:username})
    .then(account=>{
        if(account){
            if(account.password != crypto.createHash('md5').update(password).digest("hex")){
                done(null, false);
            }
            done(null,account);
        }
        else{
            done(null, false);
        }
    }).catch(err=>{
        done(err);
    });
}));