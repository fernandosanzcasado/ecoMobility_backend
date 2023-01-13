const express = require("express");
const { application } = require("express");
const passport = require("passport");
const session = require("express-session");
const { check, validationResult } = require("express-validator");


const userController = require("../modules/user/controller/user.controller");
const userService = require("../modules/user/service/user.service")

const registerSchema = require('../schemas/registerSchema');
const loginSchema = require('../schemas/loginSchema');
const updatePasswordSchema = require('../schemas/updatePasswordSchema');
const updateUserInfoSchema = require('../schemas/updateUserInfoSchema');
const emailInputSchema = require('../schemas/emailInputSchema');
const resetPasswordSchema = require("../schemas/resetPasswordSchema");
const uploadFileSchema = require("../schemas/uploadFileSchema");
const adminUpdateUserSchema = require('../schemas/adminUpdateUser');
const addOrDeleteFavouriteSchema = require("../schemas/addOrDeleteFavouriteStationSchema");

const validateRequsestSchema = require('../middleware/validateRequestSchema');
const initializePassport = require('../middleware/passport');
const handleError = require("../middleware/errorHandler");
const userAuthentication = require("../middleware/userAuthentication");


const router = express.Router();

initializePassport(passport, 
    email =>
    userService.findByEmail(email)
)

router.use(passport.initialize());

/**
 * @swagger
 * components:
 *   schemas:
 *       Users:
 *           type: object
 *           properties:
 *               Email:
 *                   type: string
 *                   example: "gmarti@gmail.com"
 *               Contraseña:
 *                   type: string
 *                   example: "0sdddad8"
 *               Fecha_registro:
 *                   type: string
 *                   example: "21/08/2022"
 *               name:
 *                   type: string
 *                   example: "paco"
 *               apellidos:
 *                   type: string
 *                   example: "adda"
 *               is_superUser:
 *                   type: boolean
 *                   example: false
 *       Email:
 *           type: object
 *           properties:
 *               Email:
 *                   type: string
 *                   example: "gmarti@gmail.com"
 *       Userme:
 *           type: object
 *           properties:
 *               Email:
 *                   type: string
 *                   example: "yo@gmail.com"
 *               Contraseña:
 *                   type: string
 *                   example: "0sdddad8"
 *               Fecha_registro:
 *                   type: string
 *                   example: "21/08/2015"
 *               name:
 *                   type: string
 *                   example: "Joe"
 *               apellidos:
 *                   type: string
 *                   example: "Harris"
 *               is_superUser:
 *                   type: boolean
 *                   example: false
 *
 *   examples:
 *       204:
 *           value:
 *               status: 204
 *               error: "No content"
 *               message: "No content"
 *       200Update:
 *           value:
 *               status: 200
 *               error: "Successful operation"
 *               message: "Successful update"
 *       200Delete:
 *           value:
 *               status: 200
 *               error: "Successful operation"
 *               message: "Successful delete"
 *       400:
 *           value:
 *               status: 400
 *               error: "Bad request"
 *               message: "Missing attributes"
 *       404:
 *           value:
 *               status: 404
 *               error: "Not found"
 *               message: "ID does not exist"
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Endpoints para Users
 */
 
/**
 * @swagger
 * /users/register:
 *   post:
 *     tags:
 *       - Users
 *     summary: Crear usuario
 *     description: Crear un usuario y guardarlo en la base de datos.
 *     operationId: createUsuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Users"
 *     parameters:
 *       - name: name
 *         in: query
 *         description: nombre usuario.
 *         required: true
 *         explode: false
 *         schema:
 *           type: string
 *       - name: surnames
 *         in: query
 *         description: Apellidos usuario.
 *         required: true
 *         explode: false
 *         schema:
 *           type: string
 *       - name: is_superUser
 *         in: query
 *         description: El Usuario es superusuario.
 *         required: false
 *         explode: false
 *         schema:
 *           type: boolean
 *       - name: dateJoined
 *         in: query
 *         description: Longitud donde se encuentra la nueva estación de carga.
 *         required: true
 *         explode: false
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: "Created"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario creado con éxito"
 *                 usuario:
 *                   $ref: "#/components/schemas/Users"
 *       400:
 *         description: "Bad request"
 *         content:
 *           application/json:
 *             examples:
 *               example:
 *                 $ref: "#/components/examples/400"
 *       409:
 *         description: "Conflict"
 *         content:
 *           application/json:
 *             examples:
 *               example:
 *                 $ref: "#/components/examples/409"
 */

router.post(`/register`,registerSchema,validateRequsestSchema,userController.registerUser);


/**
 * @swagger
 * /users/login:
 *   post:
 *    tags:
 *      - Users
 *    summary: Iniciar sesión con un usuario existente.
 *    description: Iniciar sesión con un usuario existente en la DB con el correo electrónico y la contraseña especificados.
 *    operationId: postLogin
 *    parameters:
 *      - name: email
 *        in: query
 *        description: Correo electrónico del usuario.
 *        required: true
 *        explode: false
 *        schema:
 *          type: string
 *      - name: password
 *        in: query
 *        description: Contraseña del usuario.
 *        required: true
 *        explode: false
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Operación exitosa.
 *        content:
 *          application/json:
 *            examples:
 *                $ref: '#/components/schemas/Users'
 *      400:
 *        description: Solicitud incorrecta.
 *        content:
 *          application/json:
 *            examples:
 *              example:
 *                $ref: '#/components/examples/400'
 *      401:
 *        description: La contraseña es incorrecta.
 *        content:
 *          application/json:
 *            examples:
 *              example:
 *                $ref: '#/components/examples/404'
 *      404:
 *        description: El usuario no ha sido encontrado.
 *        content:
 *          application/json:
 *            examples:
 *              example:
 *                $ref: '#/components/examples/404'
 */

router.post(`/login`,loginSchema, validateRequsestSchema, passport.authenticate('local'), userController.loginUser);


/**
 * @swagger
 * /users/resetForgottenPassword/sendMail:
 *   post:
 *     tags:
 *       - Users
 *     summary: Enviar correo electrónico para restablecer contraseña olvidada.
 *     description: Enviar correo electrónico para restablecer la contraseña olvidada de un usuario existente en la aplicación.
 *     operationId: postResetForgottenPasswordEmail
 *     parameters:
 *       - name: req
 *         in: query
 *         description: Objeto de solicitud.
 *         required: true
 *         explode: false
 *         schema:
 *           type: object
 *       - name: res
 *         in: query
 *         description: Objeto de respuesta.
 *         required: true
 *         explode: false
 *         schema:
 *           type: object
 *       - name: next
 *         in: query
 *         description: Función siguiente.
 *         required: true
 *         explode: false
 *         schema:
 *           type: function
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario para el que se desea restablecer la contraseña.
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Operación exitosa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "The password reset mail has been sent to the indicated email."
 *       400:
 *         description: Solicitud incorrecta.
 *         content:
 *           application/json:
 *             examples:
 *              example:
 *               $ref: '#/components/examples/400'
 *       404:
 *         description: El usuario no ha sido encontrado.
 *         content:
 *           application/json:
 *             examples:
 *              example:
 *               $ref: '#/components/examples/404'
 */
router.post('/resetForgottenPassword/sendMail',emailInputSchema, validateRequsestSchema, userController.resetForgottenPasswordEmail);

/**
 * @swagger
 * /users/resetForgottenPassword/resetPassword:
 *  post:
 *    tags:
 *      - Users
 *    summary: Restablecer contraseña olvidada.
 *    description: Restablecer la contraseña olvidada de un usuario existente en la aplicación utilizando un token de restablecimiento de contraseña.
 *    operationId: postResetPassword
 *    parameters:
 *      - name: req
 *        in: query
 *        description: Objeto de solicitud.
 *        required: true
 *        explode: false
 *        schema:
 *          type: object
 *      - name: res
 *        in: query
 *        description: Objeto de respuesta.
 *        required: true
 *        explode: false
 *        schema:
 *          type: object
 *      - name: next
 *        in: query
 *        description: Función siguiente.
 *        required: true
 *        explode: false
 *        schema:
 *          type: function
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              token:
 *                type: string
 *                description: Token de restablecimiento de contraseña.
 *                example: "1a2b3c4d5e"
 *              newPassword:
 *                type: string
 *                description: Nueva contraseña del usuario.
 *                example: "newPassword123"
 *    responses:
 *      200:
 *        description: Operación exitosa.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *
 *                  example: "Password reset successful."
 *      400:
 *        description: Solicitud incorrecta.
 *        content:
 *          application/json:
 *            examples:
 *              example:
 *              $ref: '#/components/examples/400'
 *      401:
 *        description: No autorizado.
 *        content:
 *          application/json:
 *            examples:
 *              example:
 *              $ref: '#/components/examples/401'
 *      404:
 *        description: El usuario no ha sido encontrado.
 *        content:
 *          application/json:
 *            examples:
 *              example:
 *              $ref: '#/components/examples/404'
 */

router.post('/resetForgottenPassword/resetPassword',resetPasswordSchema, validateRequsestSchema,userController.resetPassword);

router.use(userAuthentication.checkAuthenticated, userAuthentication.checkBlocked);

/**
 *  @swagger
 *  users/me/getInfo:
 *    get:
 *      tags:
 *        - Users
 *      summary: Get user info
 *      description: Get user info for the authenticated and non-blocked user.
 *      operationId: getUserInfo
 *      responses:
 *        200:
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Userme"
 *        204:
 *         description: "No content"
 *         content:
 *           application/json:
 *             examples:
 *              example:
 *                 $ref: "#/components/examples/204"
 */

router.get(`/me/getInfo/`, userController.getInfo);

router.get(`/me/getAchievements/`, userController.getAchievements);
router.get(`/me/getProfileImage/`, userController.getProfileImage);
router.get(`/userRanking`, userController.getRanking);

/**
 *  @swagger
 *  /users/me/updatePassword:
 *    put:
 *      tags:
 *        - Users
 *      summary: Update user password
 *      description: Update the password for the authenticated and non-blocked user.
 *      operationId: updateUserPassword
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/UpdatePassword"
 *      responses:
 *        200:
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Users"
 *        404:
 *          description: Not found
 *          content:
 *            application/json:
 *              examples:
 *                example:
 *                  $ref: "#/components/examples/404"
 */

router.put(`/me/updatePassword/`,updatePasswordSchema, validateRequsestSchema, userController.updatePassword);

/**
 * @swagger
 * /users/me/updateInfo:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update a user.
 *     description: Update the authenticated and non-blocked user with the attributes specified in the body.
 *     operationId: updateUser
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/UpdateUser"
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/examples/200Update"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             examples:
 *               example:
 *                 $ref: "#/components/examples/400"
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             examples:
 *               example:
 *                 $ref: "#/components/examples/404"
 */


router.put(`/me/updateInfo/`, updateUserInfoSchema, validateRequsestSchema, userController.updateInfo);

router.put(`/me/uploadProfileImage/`, uploadFileSchema, validateRequsestSchema, userController.uploadProfileImage);

/**
 * @swagger
 * /users/me/deleteUser/:
 *    delete:
 *      tags:
 *        - Users
 *      summary: Eliminar un usuario concreta
 *      description: Eliminar la usuario especificado en el path.
 *      operationId: deleteUsuario
 *      parameters:
 *        - name: ID
 *          in: path
 *          description: Identificador de el usuario que queremos eliminar
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/examples/200Delete"
 *        404:
 *          description: Not found
 *          content:
 *            application/json:
 *              examples:
 *                example:
 *                  $ref: "#/components/examples/404"
 */

router.delete(`/me/deleteUser/`, userController.deleteUser);


/**
 * @swagger
 * /users/logout:
 *   post:
 *     tags:
 *       - Users
 *     summary: Cerrar sesión con un usuario existente.
 *     description: Cerrar sesión con un usuario existente en la aplicación.
 *     operationId: postLogout
 *     responses:
 *       200:
 *         description: Operación exitosa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User logged out successfully."
 *       400:
 *         description: Solicitud incorrecta.
 *         content:
 *           application/json:
 *             examples:
 *              example:
 *               $ref: '#/components/examples/400'
 *       401:
 *         description: No autorizado.
 *         content:
 *           application/json:
 *             examples:
 *              example:
 *               $ref: '#/components/examples/401'
 *       404:
 *         description: El usuario no ha sido encontrado.
 *         content:
 *           application/json:
 *             examples:
 *              example:
 *               $ref: '#/components/examples/404'
 */

router.post(`/logout`,userController.logOut);

router.post(`/me/addFavouriteStation`, addOrDeleteFavouriteSchema, validateRequsestSchema, userController.addFavouriteStation);
router.delete(`/me/deleteFavouriteStation`, addOrDeleteFavouriteSchema, validateRequsestSchema, userController.deleteFavouriteStation);



router.use(userAuthentication.checkAdmin);

 
 /**
 * @swagger
 * /users/admin/getAllUsers/:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtener todas los usuarios
 *     description: Obtener todas las usuarios de la DB con todos sus atributos.
 *     operationId: getAllUsuarios
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Users"
 *       204:
 *         description: "No content"
 *         content:
 *           application/json:
 *             examples:
 *               example:
 *                 $ref: "#/components/examples/204"
 */

router.get(`/admin/getAllUsers/`,  userController.getAllUsers);
  /**
   * @swagger
   *  /users/admin/getAllUsers/count:
   *      get:
   *          tags:
   *            - Users
   *          summary: Obtener la cantidad de users en la base de datos.
   *          description: Obtener en una variable el numero de instancias en la base de datos de users.
   *          operationId: countAllUsers
   *          responses:
   *            200:
   *              description: Successful operation
   *              content:
   *                integer:
   *                  schema:
   *                    type: integer
   *                    example: 207
   *            404:
   *              description: Not found
   *              content:
   *                application/json:
   *                  examples:
   *                   example:
   *                      $ref: "#/components/examples/404"
   */
router.get(`/admin/getAllUsers/count`, userController.countAllUsers), 
  /**
   * @swagger
   * /users/admin/getUser/:email:
   *  get:
   *    tags:
   *      - Users
   *    summary: Obtener el Email de todas las usuaris
   *    description: Obtener los atributos email y ID de todos las usuarios de la DB.
   *    operationId: getDirAllUsers
   *    responses:
   *      200:
   *        description: Successful operation
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: "#/components/schemas/Email"
   *      204:
   *        description: "No content"
   *        content:
   *          application/json:
   *            examples:
   *              example:
   *                $ref: "#/components/examples/204"
   *      404:
   *        description: Not found
   *        content:
   *          application/json:
   *            examples:
   *              example:
   *                $ref: "#/components/examples/404"
   */
router.get(`/admin/getUser/:email/`, userController.findByEmail);

router.put(`/admin/updateUser/:email/`, adminUpdateUserSchema, validateRequsestSchema, userController.updateUser);

router.use(handleError);

module.exports = router;
