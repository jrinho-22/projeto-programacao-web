import { sendRoute, webPath } from "../helpers/routes";
import { myApp } from "../server/server";
import path from 'path';
import instance, { UserSession } from "../session/user-session";
import { getPacientes, savePaciente, updatePaciente } from "../database/repositories/paciente";
import { resolveError } from "../helpers/controller";

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

myApp.put('/pacienteSaveUpdate', async(req: any, res: any) => {
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
            data: pacientes,
            status: "success",
        })
    } catch (error: any) {
        resolveError(error, res)
    }
})