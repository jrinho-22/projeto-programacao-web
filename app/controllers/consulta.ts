import { validationResult } from "express-validator";
import { getLogin } from "../database/repositories/login";
import { resolveError } from "../helpers/controller";
import { myApp } from "../server/server";
import { agendarConsulta, cancelarConsulta, getConsultas } from "../database/repositories/consulta";

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

myApp.post("/agendarConsulta", async (req, res) => {
  const payload = req.body;

  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors = errors.formatWith((err) => {
      return { ...err, status: 400 };
    });
    resolveError(errors.array()[0], res);
    return;
  }

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
