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
    const [rows]: any  = await con.execute(
      'SELECT id_login, username FROM Login WHERE username = ? AND senha = ?',
      [username, senha]
    );

    if (!(rows.length > 0)) {
      const error = new Error("Senha ou usuario incorreto") as any
      error.status = 401
      throw error
    }

    console.log(rows[0])
    instance.isUserLogged = true
    
    // { id_login: 1, username: 'qw' }
    return rows[0]
}
