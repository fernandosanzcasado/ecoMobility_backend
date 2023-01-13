
function checkAuthenticated(req,res,next){
    if (req.isAuthenticated()){
        return next();
    }
    return res.status(403).json({message: "You must be logged in to perform this action."});
}

function checkAdmin(req,res,next){
    if (req.user.isSuperuser){
        return next();
    }
    return res.status(401).json({message: "You must be an admin to perform this action."});
}

function checkBlocked(req,res,next){
    if(!req.user.isBlocked){
        return next();
    }
    req.logOut(function(err) {
        if (err) { return next(err); }
        res.status(403).json({message: "This user is blocked."});
      });   
}



module.exports = {
    checkAuthenticated,
    checkAdmin,
    checkBlocked
}