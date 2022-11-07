const { authenticate } = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrpyt = require('bcrypt')





function initialize(passport, findUserByEmail){
    const authenticateUser = async (email, password, done) => {
        const user = findUserByEmail(email);

        if(user == null){
            return done(null,false, {message: 'User not found'})
        }


        try{
            if(await bcrpyt.compare(password, user.password)){
                return done(null, user)
            }else{
                return done(null, false, {message: 'Password incorrect.'})
            }
        }catch(err){
            return done(err)
        }
    }
    passport.use(new LocalStrategy({usernameField: 'email'}, 
    authenticateUser))
    passport.serializeUser((user, done) =>{  })
    passport.deserializeUser((id, done) =>{  })
}


module.exports = initialize