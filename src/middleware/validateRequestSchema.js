const { validationResult } = require("express-validator");



const myValidationResult = validationResult.withDefaults({
    formatter: error => {
      return {
        name : 'Invalid ' + error.param,
        message: error.msg,
        status: 400
      };
    },
  });



function validateRequsestSchema(req,res,next){
    const errors = myValidationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next();
}

module.exports = validateRequsestSchema;
