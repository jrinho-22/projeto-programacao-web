import { body, ValidationChain } from "express-validator";

export const consultaValidation = [
    body('psicologoId').notEmpty().withMessage('pisiclogo id é obrigatorio'),
    body('pacienteId').notEmpty().withMessage('pacienteId é obrigatorio'),
    body('data').notEmpty().withMessage('Data é obrigatorio'),
    body('hora').notEmpty().withMessage('Horario é obrigatorio'),
]