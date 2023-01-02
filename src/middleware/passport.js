const { authenticate } = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrpyt = require('bcrypt');
const IncorrectPassword = require('../errors/user.errors/incorrectPassword');


function initialize(passport, findUserByEmail){
    const authenticateUser = async (email, password, done) => {
    
        try{
            const user = await findUserByEmail(email);
            if(await bcrpyt.compare(password, user.password) === false){
                return done(new IncorrectPassword(), false);
            }
            if(user.isBlocked === true){
                return done({message: 'This user is blocked'}, false);
            }
            return done(null, user);   
        }catch(err){
            return done(err);
        }  
    }
    passport.use(new LocalStrategy({usernameField: 'email'}, 
    authenticateUser))
    passport.serializeUser((user, done) => done(null,user.email))
    passport.deserializeUser(async (email, done) =>{ 
        return done(null, await findUserByEmail(email));
    })
}


module.exports = initialize