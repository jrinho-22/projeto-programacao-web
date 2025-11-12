import { myApp } from "../server/server";
import { resolveError, validateBody } from "../helpers/controller";
import { pacienteValidation } from "../validation/paciente";
import { validationResult } from "express-validator";
import { getPsicologos, savePsicologo, updatePsicologo } from "../database/repositories/psicologos";
import { psicologoValidation } from "../validation/psicologo";


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

myApp.put('/psicologoUpdate', async(req: any, res: any) => {
    const payload = req.body

    try {
        let psicologo = await getPsicologos() as any[]
        let psicologoExistente = psicologo.find(v => v.id_psicologo == payload?.id_psicologo)
        if (!psicologoExistente) {
            throw new Error("Psicologo não encontrado")
        }
        await updatePsicologo(payload) 

        res.send({
            data: true,
            status: "success",
        })
    } catch (error: any) {
        resolveError(error, res)
    }
})

myApp.post('/psicologoSave', psicologoValidation, async(req: any, res: any) => {
    var valid = validateBody(req, res)
    if (!valid) return
    const payload = req.body

    try {
        var response = await savePsicologo(payload) 

        res.send({
            data: response,
            status: "success",
        })
    } catch (error: any) {
        resolveError(error, res)
    }
})