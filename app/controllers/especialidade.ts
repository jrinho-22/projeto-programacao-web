import {
  addEspecialidade,
  deleteEspecialidade,
  getAllEspecialidades,
  updateEspecialidade,
} from "../database/repositories/especialidade";
import { resolveError } from "../helpers/controller";
import { myApp } from "../server/server";

myApp.get("/getAllEspecialidades", async (req: any, res: any) => {
  let especialidades = await getAllEspecialidades();

  res.send({
    data: especialidades,
    status: "success",
  });
});

myApp.put("/updateEspecialidade", async (req: any, res: any) => {
  const payload = req.body;

  let especialidades = await updateEspecialidade(
    payload.id_especialidade,
    payload.descricao
  );

  res.send({
    data: especialidades,
    status: "success",
  });
});

myApp.post("/addEspecialidade", async (req: any, res: any) => {
  const payload = req.body;

  try {
    let especialidades = await addEspecialidade(payload.descricao);

    res.send({
      data: especialidades,
      status: "success",
    });
    
  } catch (error: any) {
    resolveError(error, res);
  }
});

myApp.delete("/deleteEspecialidade/:id", async (req: any, res: any) => {
  const { id } = req.params;
  try {
    let especialidades = await deleteEspecialidade(id);

    res.send({
      data: especialidades,
      status: "success",
    });

  } catch (error: any) {
    resolveError(error, res);
  }
});
