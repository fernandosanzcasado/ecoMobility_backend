const { check } = require("express-validator");

const loginSchema = [check('email').notEmpty().isEmail().normalizeEmail(),
                     check('password').notEmpty().trim().isLength({min:8}).whitelist(/^[ A-Za-z0-9_@./#&+-]+$/)
];

module.exports = loginSchema; 