const bcrypt = require("bcrypt");
const { json } = require("body-parser");

const transporter = require("../../../helpers/nodemailer");
const tokenService = require("../../token/service/token.service");
const userRepository = require("../repository/user.repository");
const BLOBsRepository = require("../../BLOBs.repository");
const estacionesService = require("../../estaciones/service/estaciones.service");
const bicingService = require("../../bicing/service/bicing.service");

const UserNotFoundError = require("../../../errors/user.errors/userNotFound");
const IncorrectPassword = require("../../../errors/user.errors/incorrectPassword");
const UserAlreadyExists = require("../../../errors/user.errors/userAlreadyExists");
const ProfilePictureTooBig = require("../../../errors/user.errors/profilePictureTooBig");

//fitxer que s'encarrega de tota la logica relacionada amb els usuaris
class userService {
  async findByEmail(email) {
    const user = await userRepository.findByEmail(email);

    if (!user.Item) {
      throw new UserNotFoundError();
    } else {
      return user.Item;
    }
  }

  async create(data) {
    const newUser = await userRepository.createUser({
      email: data.email,
      name: data.name,
      surnames: data.surnames,
      password: data.password,
    });
    return newUser.Attributes;
  }

  async updateUser(email, data) {
    const user = await userRepository.findByEmail(email);
    if (!user.Item) {
      throw new UserNotFoundError();
    }

    const updatedUser = await userRepository.updateUser(email, {
      name: data.name,
      surnames: data.surnames,
      isSuperuser: data.isSuperuser,
      isBlocked: data.isBlocked,
    });
    return updatedUser.Attributes;
  }

  async updatePassword(email, oldPassword, checkOldPassword, newPassword) {
    if (await bcrypt.compare(checkOldPassword, oldPassword)) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      return await userRepository.updatePassword(email, hashedPassword);
    } else {
      throw new IncorrectPassword();
    }
  }

  async updateInfo(email, info) {
    return await userRepository.updateUserInfo(email, info);
  }

  async uploadProfileImage(email, imageInfo) {
    const extension = imageInfo.name.toLowerCase().split(".");

    if (imageInfo.size > 1000000) {
      throw new ProfilePictureTooBig();
    }

    const profileImagePath =
      "ecomobility/users/" +
      email +
      "/" +
      imageInfo.md5 +
      "." +
      extension[extension.length - 1];

    const uploadedImage = await BLOBsRepository.uploadImage(
      profileImagePath,
      imageInfo.data,
      imageInfo.mimetype
    );
    await userRepository.uploadProfileImage(email, uploadedImage.Location);

    return;
  }

  async deleteUser(email) {
    return await userRepository.deleteUserByEmail(email);
  }

  async deleteByEmail(email) {
    const deletedUser = await userRepository.deleteUserByEmail(email);
    if (!deletedUser.Attributes) {
      throw new UserNotFoundError();
    }
    return deletedUser.Attributes;
  }

  async loginUser(data) {
    const user = await userRepository.findByEmail(data.email);

    if (!user.Item) {
      throw new UserNotFoundError();
    } else if (user.Item.password !== data.password) {
      throw new IncorrectPassword();
    } else {
      return user;
    }
  }

  async registerUser(data) {
    const userInDB = await userRepository.findByEmail(data.email);
    if (userInDB.Item) {
      throw new UserAlreadyExists();
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const achievements = [];

    for (var i = 0; i < 7; ++i) {
      achievements.push({ id: i, value: 0 });
    }

    const newUser = await userRepository.createUser({
      email: data.email,
      name: data.name,
      surnames: data.surnames,
      password: hashedPassword,
      achievements: achievements,
    });
    return newUser;
  }
  async resetForgottenPasswordEmail(email) {
    const user = await userRepository.findByEmail(email);

    if (!user.Item) {
      throw new UserNotFoundError();
    }

    const newToken = await tokenService.createToken(email);

    const mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: "Reset your EcoMobility password",
      text: `Hi ${user.Item.name},\nYou recently requested to reset the password for your EcoMobility account. To reset your password please follow the next steps:\n -1. Copy this token: ${newToken}.\n -2.Go to reset password on the app and click on "Reset Password Code".\n -3.Introduce the code and this will redirect you to a screen where you will be able to reset your password.\n\nIf you did not request a password reset, please ignore this email or reply to let us know.\nEcomobility Team`,
    };

    transporter.sendMail(mailOptions, function (err) {
      if (err) {
        throw err;
      }
    });
    return newToken;
  }

  async resetPassword(token, newPassword) {
    const validToken = await tokenService.findToken(token);

    if (validToken) {
      await tokenService.updateExpirationDate(validToken.token);

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await userRepository.updatePassword(validToken.email, hashedPassword);
    }

    return validToken;
  }

  async getAllUsers() {
    const users = await userRepository.getAllUsers();
    return users.Items;
  }

  async countAllUsers() {
    const users = await userRepository.getAllUsers();
    return users.Count;
  }


  async createPostEnviaNotificacion(token) {
    console.log("ETRO A LA FUNCION DE LA NOTI");
    let axiosheaders = {
      headers: {
        host: "exp.host",
        accept: "application/json",
        "accept-encoding": "gzip, deflate",
        "content-type": "application/json",
      },
    };
    console.log("Entro a createPostEnviaNotificacion");
    console.log(token);
    return await axios
      .post(
        "https://exp.host/--/api/v2/push/send",
        {
          to: token,
          title: "cacacac",
          body: "AAAAAAAAAAAAA",
        },
        axiosheaders
      )
      .then(function (response) {
        console.log("Funciona el createPostRecoverPassword");
        return true;
      })
      .catch(function (error) {
        console.log("Da error el createPostRecoverPassword");
        console.log(error.response.data.message);
        return false;
      });
  }

  async updateExponentPushToken(email,exponentPushToken){
    await userRepository.updateExponentPushToken(email,exponentPushToken);
  }

  async getUsersExponentPushToken(){
    return await userRepository.getUsersExponentPushToken()
  }


  async addFavouriteStation(email,stationId){
    await userRepository.addFavouriteStation(email,stationId);
    return;
  }

  async deleteFavouriteStation(email,stationId){
    await userRepository.deleteFavouriteStation(email,stationId);
    return;
  }

  async addEcoPoints(email,ecoPoints){
    await userRepository.addEcoPoints(email,ecoPoints);
    return;

  async getRanking(){
    return await userRepository.getRanking();
  }
  
  

}

module.exports = new userService();

