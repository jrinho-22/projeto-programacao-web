import { body, ValidationChain } from "express-validator";

export const pacienteValidation = [
    body('login').notEmpty().withMessage('Login é obrigatorio'),
    body('senha').notEmpty().withMessage('Password é obrigatorio'),
    body('nome').notEmpty().withMessage('Nome é obrigatorio'),
    body('cpf').notEmpty().withMessage('Cpf é obrigatorio'),
    body('email').notEmpty().toLowerCase().withMessage('Cpf é obrigatorio'),
]