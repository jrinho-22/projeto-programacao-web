import { validationResult } from "express-validator";
import { agendarConsulta } from "../database/repositories/consulta";
import { resolveError } from "../helpers/controller";
import { myApp } from "../server/server";
import { avaliacaoValidation } from "../validation/avaliacao";
import { getAvaliacoes, getAvaliacoesAll, registrarAvaliacao } from "../database/repositories/avaliacao";

myApp.post("/registrarAvaliacao", avaliacaoValidation, async (req: any, res: any) => {
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
    await registrarAvaliacao(payload);
    res.send({
      data: true,
      status: "success",
      // redirect: "/home"
    });
  } catch (error: any) {
    resolveError(error, res);
  }
});

myApp.get('/avaliacoes', async(req: any, res: any) => {
    const psicologoId = req.query.psicologoId;
    // if (!instance.isUserLogged) {
    //     res.redirect('/login');
    // } 
    let avaliacoes = await getAvaliacoes(psicologoId)
    
    res.send({
        data: avaliacoes,
        status: "success",
    })
})

myApp.get('/avaliacoesAll', async(req: any, res: any) => {
    // if (!instance.isUserLogged) {
    //     res.redirect('/login');
    // } 
    let avaliacoes = await getAvaliacoesAll()
    
    res.send({
        data: avaliacoes,
        status: "success",
    })
})