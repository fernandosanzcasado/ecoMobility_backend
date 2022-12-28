
const { check } = require("express-validator");

const uploadFileSchema = [check('profileImage').custom((value, {req}) => {
   
   if( req.files == null || !req.files['profileImage'] ){
    throw new Error('No file was submitted')
   }
   const extension = req.files['profileImage'].name.toLowerCase().split('.');

   if(extension.length <= 1){
    throw new Error('Profile picture has a wrong format. Make sure the image follows this structure : filename.file_extension');
  }

  const array_of_allowed_files = ['png', 'jpeg', 'jpg', 'gif'];

  if(!array_of_allowed_files.includes(extension[extension.length - 1])){
    throw new Error('Profile picture has a wrong extension.Make sure it is a png, jpeg, jpg or a gif.');
  }
   return true;
})



];

module.exports = uploadFileSchema; 

