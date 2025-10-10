import instance from "../../session/user-session";
import { connection } from "../connection";

export async function getPacientes() {
    const [rows] = await (await connection).execute(
        'SELECT * FROM Pessoa',
    );

    return rows
}

export async function savePaciente(params: any) {
    let con = await connection

    let [res] = await con.execute(
        'INSERT INTO Login (username, senha) VALUES (?, ?)',
        [params.email, params.nome + 123]
    ) as any

    await con.execute(
        'INSERT INTO Pessoa (id_pessoa, nome, email, tipo) VALUES (?, ?, ?, ?)',
        [res.insertId, params.nome, params.email, params.tipo]
    )
}

export async function updatePaciente(params: any) {
    let con = await connection
    await con.execute(
        'UPDATE Pessoa SET nome = ?, email = ?, tipo = ? WHERE id_pessoa = ?;',
        [params.nome, params.email, params.tipo, params.id_pessoa]
    )
}