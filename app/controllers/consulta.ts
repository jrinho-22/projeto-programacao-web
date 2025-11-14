import { validationResult } from "express-validator";
import { getLogin } from "../database/repositories/login";
import { resolveError, validateBody } from "../helpers/controller";
import { myApp } from "../server/server";
import { agendarConsulta, cancelarConsulta, concluirConsulta, getConsultas } from "../database/repositories/consulta";
import { consultaValidation } from "../validation/consulta";

myApp.get('/consultas', async(req: any, res: any) => {
    const userId = req.query.userId;
    const psicologoId = req.query.psicologoId;
    // if (!instance.isUserLogged) {
    //     res.redirect('/login');
    // } 
    let consultas = await getConsultas(userId, psicologoId)
    
    res.send({
        data: consultas,
        status: "success",
    })
})

myApp.put('/cancelarConsulta/:consultaId', async(req: any, res: any) => {
    const consultaId = req.params.consultaId;
    // if (!instance.isUserLogged) {
    //     res.redirect('/login');
    // } 
    await cancelarConsulta(consultaId)
    
    res.send({
        data: true,
        status: "success",
    })
})

myApp.put('/concluirConsulta/:consultaId', async(req: any, res: any) => {
    const consultaId = req.params.consultaId;

    await concluirConsulta(consultaId)
    
    res.send({
        data: true,
        status: "success",
    })
})

myApp.post("/agendarConsulta", consultaValidation, async (req: any, res: any) => {
    var valid = validateBody(req, res)
    if (!valid) return
    const payload = req.body

  try {
    await agendarConsulta(payload);
    res.send({
      data: true,
      status: "success",
      // redirect: "/home"
    });
  } catch (error: any) {
    resolveError(error, res);
  }
});
