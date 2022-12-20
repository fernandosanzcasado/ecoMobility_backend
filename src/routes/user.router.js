const express = require("express");
const { application } = require("express");
const passport = require("passport");
const session = require("express-session");
const { check, validationResult } = require("express-validator");

const userController = require("../modules/user/controller/user.controller");
const userService = require("../modules/user/service/user.service");
const registerSchema = require("../schemas/registerSchema");
const loginSchema = require("../schemas/loginSchema");
const updatePasswordSchema = require("../schemas/updatePasswordSchema");
const updateUserInfoSchema = require("../schemas/updateUserInfoSchema");
const emailInputSchema = require("../schemas/emailInputSchema");

const validateRequsestSchema = require("../middleware/validateRequestSchema");
const initializePassport = require("../middleware/passport");
const handleError = require("../middleware/errorHandler");
const userAuthentication = require("../middleware/userAuthentication");
const resetPasswordSchema = require("../schemas/resetPasswordSchema");

const router = express.Router();

initializePassport(passport, (email) => userService.findByEmail(email));

router.use(
  session({
    secret: "YUNG_BEEF",
    resave: false,
    saveUninitialized: false,
  })
);

router.use(passport.session());
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


    /users:
    get:
        tags:
        - Usuarios
        summary: Obtener todas los usuarios
        description: Obtener todas las usuarios de la DB con todos sus atributos.
        operationId: getAllUsuarios
        responses:
        200:
            description: Successful operation
            content:
            application/json:
                schema:
                type: array
                items:
                    $ref: "#/components/schemas/Users"
        204:
            description: "No content"
            content:
            application/json:
                examples:
                example:
                    $ref: "#/components/examples/204"


router.get(
  `/admin/getAllUsers/`,
  userAuthentication.checkAuthenticated,
  userAuthentication.checkBlocked,
  userAuthentication.checkAdmin,
  userController.getAllUsers
);

/**
 * @swagger
 * /users/count:
 *   get:
 *     tags:
 *       - Estaciones
 *     summary: Obtener la cantidad de users en la base de datos.
 *     description: Obtener en una variable el numero de instancias en la base de datos de users.
 *     operationId: countEstaciones
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           integer:
 *             schema:
 *               type: integer
 *               example: 207
 */
router.get(
`/admin/getAllUsers/count`,
  userAuthentication.checkAuthenticated,
  userAuthentication.checkBlocked,
  userAuthentication.checkAdmin,
  userController.countAllUsers
),

/users/Email:
  get:
    tags:
      - Users
    summary: Obtener el Email de todas las usuaris
    description: Obtener los atributos email y ID de todos las usuarios de la DB.
    operationId: getDirAllUsers
    responses:
      200:
        description: Successful operation
        content:
          application/json:
            schema:
              type: array
              items:
                $ref: "#/components/schemas/Users"
      204:
        description: "No content"
        content:
          application/json:
            examples:
              example:
                $ref: "#/components/examples/204"
      400:
        description: Bad request
        content:
          application/json:
            examples:
              example:
                $ref: "#/components/examples/400"
      404:
        description: Not found
        content:
          application/json:
            examples:
              example:
                $ref: "#/components/examples/404"
router.get(
    `/admin/getUser/:email/`,
    userAuthentication.checkAuthenticated,
    userAuthentication.checkAdmin,
    userController.findByEmail
  );


router.put(
  `/admin/updateUser/:email/`,
  userAuthentication.checkAuthenticated,
  userAuthentication.checkBlocked,
  userAuthentication.checkAdmin,
  userController.updateUser
);

router.get(
  `/me/getInfo/`,
  userAuthentication.checkAuthenticated,
  userAuthentication.checkBlocked,
  userController.getInfo
);
router.put(
  `/me/updatePassword/`,
  userAuthentication.checkAuthenticated,
  userAuthentication.checkBlocked,
  updatePasswordSchema,
  validateRequsestSchema,
  userController.updatePassword
);put:
tags:
  - Users
summary: Actualizar una nuevo usuario.
description: Actualiza el usuario definido en el path añadiendo los atributos especificados en el body.
operationId: updateUser
parameters:
  - name: name
    in: query
    description: nombre usuario.
    required: true
    explode: false
    schema:
      type: string
      post:
  - name: surnames
    in: query
    description: Apellidos usuario.
    required: true
    explode: false
    schema:
      type: string
  - name: is_superUser
    in: query
    description: El Usuario es superusuario.
    required: false
    explode: false
    schema:
      type: boolean
  - name: dateJoined
    in: query
    description: Longitud donde se encuentra la nueva estación de carga.
    required: true
    explode: false
    schema:
      type: string

responses:
  200:
    description: Successful operation
    content:
      application/json:
        schema:
          type: array
          items:
            $ref: "#/components/examples/200Update"
  400:
    description: Bad request
    content:
      application/json:
        examples:
          example:
            $ref: "#/components/examples/400"
  404:
    description: Bad request
    content:
      application/json:
        examples:
          example:
            $ref: "#/components/examples/404"


router.put(
  `/me/updateInfo/`,
  userAuthentication.checkAuthenticated,
  userAuthentication.checkBlocked,
  updateUserInfoSchema,
  validateRequsestSchema,
  userController.updateInfo
);

delete:
    tags:
      - Users
    summary: Eliminar un usuario concreta
    description: Eliminar la usuario especificado en el path.
    operationId: deleteUsuario
    parameters:
      - name: ID
        in: path
        description: Identificador de el usuario que queremos eliminar
        required: true
        schema:
          type: string
    responses:
      200:
        description: Successful operation
        content:
          application/json:
            schema:
              type: array
              items:
                $ref: "#/components/examples/200Delete"
      404:
        description: Not found
        content:
          application/json:
            examples:
              example:
                $ref: "#/components/examples/404"
                
router.delete(
  `/me/deleteUser/`,
  userAuthentication.checkAuthenticated,
  userAuthentication.checkBlocked,
  userController.deleteUser
);

router.post(
  `/register`,
  registerSchema,
  validateRequsestSchema,
  userController.registerUser
);

/users/login:
  post:
    tags:
      - Users
    summary: Loguear un usuario existente.
    description: Hace Login de un usuario ya existente con el Id como el email pasado como parametro y la contraseña pasada como parametro.
    operationId: LogintUsuario
    parameters:
      - name: Email
        in: query
        description: nombre usuario.
        required: true
        explode: false
        schema:
          type: string
          post:
      - name: password
        in: query
        description: Apellidos usuario.
        required: true
        explode: false
        schema:
          type: string

router.post(
  `/login`,
  loginSchema,
  validateRequsestSchema,
  passport.authenticate("local"),
  userAuthentication.checkBlocked,
  userController.loginUser
);
router.post(
  `/logout`,
  userAuthentication.checkAuthenticated,
  userAuthentication.checkBlocked,
  userController.logOut
);
router.post(
  "/resetForgottenPassword/sendMail",
  emailInputSchema,
  validateRequsestSchema,
  userController.resetForgottenPasswordEmail
);
router.post(
  "/resetForgottenPassword/resetPassword",
  resetPasswordSchema,
  validateRequsestSchema,
  userController.resetPassword
);

router.use(handleError);

module.exports = router;
