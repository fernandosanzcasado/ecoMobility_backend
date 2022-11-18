
function checkAuthenticated(req,res,next){
    if (req.isAuthenticated()){
        return next();
    }
    return res.status(403).json({message: "You must be logged in to perform this action"});
}


module.exports = {
    checkAuthenticated,
 }