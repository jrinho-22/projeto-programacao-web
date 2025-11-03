import { getLogin } from "../database/repositories/login";
import { resolveError } from "../helpers/controller";
import { myApp } from "../server/server";

const base = "login"

// myApp.post("/login/save", async(req, res) => {
//     await getLogin(req.body.username, req.body.password)
//     res.send({
        
//     })
// })

myApp.post("/login/session", async(req, res) => {
    try {
        var userData = await getLogin(req.body.login, req.body.senha, req.body.tipo)
        res.send({
            data: userData,
            status: "success",
            // redirect: "/home"
        })
    } catch (error: any) {
        resolveError(error, res)
    }
})