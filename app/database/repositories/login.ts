import instance from "../../session/user-session";
import { connection } from "../connection";

export const saveNewLogin = async(username: string, senha: string) => {
    const [result] = await (await connection).execute(
        'INSERT INTO Login (username, senha) VALUES (?, ?)',
        [username, senha]
    );
}

export async function getLogin(username: string, senha: string) {

    const [rows] = await (await connection).execute(
      'SELECT id_login, username, senha FROM Login WHERE username = ?',
      [username]
    );

    let rowsRetyped = rows as Array<any>

    if (rowsRetyped.length == 0) {
      const error = new Error("Senha ou usuario incorreto") as any
      error.status = 401
      throw error
    }

    const user = rowsRetyped[0]

    const passwordMatch = user.senha == senha

    if (!passwordMatch) {
        const error = new Error("Senha ou usuario incorreto") as any
        error.status = 401
        throw error
    }

    instance.isUserLogged = true
    return true
}
