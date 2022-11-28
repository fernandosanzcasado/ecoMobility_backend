const { check } = require("express-validator");

const registerSchema = [check('email').notEmpty().isEmail().normalizeEmail(),
                check('name').notEmpty().trim().isLength({min:2}).whitelist(/[a-zA-Z]+/),
                check('surnames').notEmpty().trim().whitelist(/[a-zA-Z]+/),
                check('password').notEmpty().trim().isLength({min:8}).whitelist(/^[ A-Za-z0-9_@./#&+-]+$/)
];

module.exports = registerSchema; 