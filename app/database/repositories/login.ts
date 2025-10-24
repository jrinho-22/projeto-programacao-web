import instance from "../../session/user-session";
import { connection } from "../connection";

export const saveNewLogin = async(username: string, senha: string) => {
    let con = await connection()
    const [result] = await con.execute(
        'INSERT INTO Login (username, senha) VALUES (?, ?)',
        [username, senha]
    );
}

export async function getLogin(username: string, senha: string, tipo: number) {
    let con = await connection()
    const [rows] = await con.execute(
      'SELECT id_login, username, senha FROM Login WHERE username = ?',
      [username]
    );

    let rowsRetyped = rows as Array<any>

    if (rowsRetyped.length == 0) {
      const error = new Error("Senha ou usuario incorreto") as any
      error.status = 401
      throw error
    }

    if (rowsRetyped.length > 0) {
      console.log(rowsRetyped[0])
      const [rows]: any = await con.execute(
        'SELECT * FROM Pessoa WHERE id_pessoa = ?',
        [rowsRetyped[0].id_login]
      );
      console.log(rows)
      if (rows[0].tipo != tipo) {
        throw new Error("Login não pertence ao seu tipo de usuario") as any
      }
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
