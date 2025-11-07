import { body, ValidationChain } from "express-validator";

export const loginValidation = [
    body('login').notEmpty().withMessage('Login id é obrigatorio'),
    body('senha').notEmpty().withMessage('Senha é obrigatorio'),
]