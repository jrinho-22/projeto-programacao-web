import { myApp } from "../server/server";
import { getPacientes, savePaciente, updatePaciente } from "../database/repositories/paciente";
import { resolveError, validateBody } from "../helpers/controller";
import { pacienteValidation } from "../validation/paciente";
import { ValidationChain, validationResult } from "express-validator";


myApp.get('/paciente', async(req: any, res: any) => {
    // if (!instance.isUserLogged) {
    //     res.redirect('/login');
    // } 
    let pacientes = await getPacientes()
    
    res.send({
        data: pacientes,
        status: "success",
    })
})

myApp.put('/pacienteSaveUpdate', pacienteValidation, async(req: any, res: any) => {

    var valid = validateBody(req, res)
    if (!valid) return
    const payload = req.body

    // if (!instance.isUserLogged) {
    //     res.redirect('/login');
    // } 
    try {
        let pacientes = await getPacientes() as any[]
        if (payload?.id_pessoa) {
            let pacienteExistente = pacientes.find(v => v.id_pessoa == payload?.id_pessoa)
            if (!pacienteExistente) {
                throw new Error("Paciente não encontrado")
            }
            await updatePaciente(payload) 
        } else {
            await savePaciente(payload) 
        }

        res.send({
            data: true,
            status: "success",
        })
    } catch (error: any) {
        resolveError(error, res)
    }
})