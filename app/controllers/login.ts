import { getLogin } from "../database/repositories/login";
import { resolveError, validateBody } from "../helpers/controller";
import { myApp } from "../server/server";
import { loginValidation } from "../validation/login";

const base = "login";

// myApp.post("/login/save", async(req, res) => {
//     await getLogin(req.body.username, req.body.password)
//     res.send({

//     })
// })

myApp.post("/login/session", loginValidation, async (req: any, res: any) => {
  var valid = validateBody(req, res);
  if (!valid) return;
  const payload = req.body;
  
  try {
    var userData = await getLogin(
      req.body.login,
      req.body.senha,
      req.body.tipo
    );
    res.send({
      data: userData,
      status: "success",
      // redirect: "/home"
    });
  } catch (error: any) {
    resolveError(error, res);
  }
});
