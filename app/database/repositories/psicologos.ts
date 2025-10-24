import instance from "../../session/user-session";
import { connection } from "../connection";

export async function getPsicologos() {
    let con = await connection()

    const [rows] = await con.execute(
        'SELECT * FROM Pessoa',
    );

    return rows
}

export async function savePsicologo(params: any) {
    let con = await connection()
    console.log(params)
    let [res] = await con.execute(
        'INSERT INTO Login (username, senha) VALUES (?, ?)',
        [params.email, params.nome + params.senha]
    ) as any

    await con.execute(
        'INSERT INTO Pessoa (id_pessoa, nome, email, tipo) VALUES (?, ?, ?, ?)',
        [res.insertId, params.nome, params.email, 2]
    )
}

export async function updatePsicologo(params: any) {
    let con = await connection()
    await con.execute(
        'UPDATE Pessoa SET nome = ?, email = ? WHERE id_pessoa = ?;',
        [params.nome, params.email, params.id_pessoa]
    )
}