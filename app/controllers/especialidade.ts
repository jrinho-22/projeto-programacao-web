import { getAllEspecialidades } from "../database/repositories/especialidade";
import { myApp } from "../server/server";

myApp.get('/getAllEspecialidades', async(req: any, res: any) => {
    
    let especialidades = await getAllEspecialidades()
    
    res.send({
        data: especialidades,
        status: "success",
    })
})