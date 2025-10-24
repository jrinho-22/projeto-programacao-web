import { myApp } from "../server/server";
import { resolveError } from "../helpers/controller";
import { pacienteValidation } from "../validation/paciente";
import { ValidationChain, validationResult } from "express-validator";
import { getPsicologos, savePsicologo, updatePsicologo } from "../database/repositories/psicologos";


myApp.get('/psicologo', async(req: any, res: any) => {
    // if (!instance.isUserLogged) {
    //     res.redirect('/login');
    // } 
    let psicologos = await getPsicologos()
    
    res.send({
        data: psicologos,
        status: "success",
    })
})

myApp.put('/pacienteSaveUpdate', pacienteValidation, async(req: any, res: any) => {
    const payload = req.body
    
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors = errors.formatWith(err => {return {...err, status: 400}})
      resolveError(errors.array()[0], res)
      return
    }

    // if (!instance.isUserLogged) {
    //     res.redirect('/login');
    // } 
    try {
        if (!errors.isEmpty()) {
           errors.throw()
        }
        let pacientes = await getPsicologos() as any[]
        if (payload?.id_pessoa) {
            let pacienteExistente = pacientes.find(v => v.id_pessoa == payload?.id_pessoa)
            if (!pacienteExistente) {
                throw new Error("Paciente não encontrado")
            }
            await updatePsicologo(payload) 
        } else {
            await savePsicologo(payload) 
        }

        res.send({
            data: true,
            status: "success",
        })
    } catch (error: any) {
        resolveError(error, res)
    }
})