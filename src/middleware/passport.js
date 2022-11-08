const { authenticate } = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrpyt = require('bcrypt');
const IncorrectPassword = require('../errors/user.errors/incorrectPassword');





function initialize(passport, findUserByEmail){
    const authenticateUser = async (email, password, done) => {
    
        try{
            const user = await findUserByEmail(email);

            try{
                if(await bcrpyt.compare(password, user.Password)){
                    return done(null, user)
                }else{
                    return done(new IncorrectPassword(), false)
                }
            }catch(err){
                return done(err);
            }
        }catch(err){
            return done(err);
        }  
    }
    passport.use(new LocalStrategy({usernameField: 'email'}, 
    authenticateUser))
    passport.serializeUser((user, done) => done(null,user.Email))
    passport.deserializeUser((id, done) =>{  
        return done(null, findUserByEmail(email));
    })
}


module.exports = initialize