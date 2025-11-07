import instance from "../../session/user-session";
import { connection } from "../connection";

export const saveNewLogin = async(username: string, senha: string) => {
    let con = await connection()
    const [result] = await con.execute(
        'INSERT INTO Login (usuario, senha) VALUES (?, ?)',
        [username, senha]
    );
}

export async function getLogin(username: string, senha: string, tipo: number) {
    let con = await connection()
    const [rows]: any  = await con.execute(
      `SELECT id_login, usuario, p.tipo_pessoa_id FROM Login l
        JOIN Pessoa p on p.id_pessoa = l.id_login
        WHERE usuario = ? AND senha = ?
        LIMIT 1`,
      [username, senha]
    );
    console.log(rows, 'rows')
    if (!(rows.length > 0) || rows[0]?.tipo_pessoa_id !== tipo) {
      const error = new Error("Senha ou usuario incorreto") as any
      error.status = 401
      throw error
    }

    instance.isUserLogged = true
    
    // { id_login: 1, username: 'qw' }
    return rows[0]
}
