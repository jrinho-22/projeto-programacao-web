import { ativarPessoa, inativarPessoa } from "../database/repositories/pessoa"
import { resolveError } from "../helpers/controller"
import { myApp } from "../server/server"

myApp.put('/inativarCadastro/:pessoaId', async(req: any, res: any) => {
    const { pessoaId } = req.params;

    try {
        await inativarPessoa(pessoaId) 

        res.send({
            data: true,
            status: "success",
        })
    } catch (error: any) {
        resolveError(error, res)
    }
})

myApp.put('/ativarCadastro/:pessoaId', async(req: any, res: any) => {
    const { pessoaId } = req.params;

    try {
        await ativarPessoa(pessoaId) 

        res.send({
            data: true,
            status: "success",
        })
    } catch (error: any) {
        resolveError(error, res)
    }
})