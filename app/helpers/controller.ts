import { validationResult } from "express-validator";

export const resolveError = (error: any, res: any) => {
    res.status(error.status || 500).send({
        data: [],
        status: 'error',
        errorMessage: error.message || error.msg,
    })
}   

export const validateBody = (req: any, res: any) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors = errors.formatWith(err => {return {...err, status: 400}})
      resolveError(errors.array()[0], res)
      return false
    }

    return true
}