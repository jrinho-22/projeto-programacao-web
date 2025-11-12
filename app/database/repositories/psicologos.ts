import instance from "../../session/user-session";
import { connection } from "../connection";

export async function getPsicologos() {
    let con = await connection()

    const [rows] = await con.execute(
        'SELECT * from Psicologo p join Pessoa p2 on p2.id_pessoa = p.id_psicologo',
    );

    return rows
}

export async function savePsicologo(params: any) {
  let con = await connection();
  let [res] = (await con.execute(
    "INSERT INTO Login (usuario, senha) VALUES (?, ?)",
    [params.usuario, params.senha]
  )) as any;

  await con.execute(
    "INSERT INTO Pessoa (id_pessoa, nome, email, tipo_pessoa_id) VALUES (?, ?, ?, ?)",
    [res.insertId, params.nome, params.email, 1]
  );

  await con.execute(
    "INSERT INTO Psicologo (id_psicologo, crp, especialidade_id, valor_hora) VALUES (?, ?, ?, ?)",
    [res.insertId, params.crp, params.especialidadeId, params.valorHora]
  );

  return {id: res.insertId}
}

export async function updatePsicologo(params: any) {
    let con = await connection()
    await con.execute(
        'UPDATE Pessoa SET nome = ?, email = ? WHERE id_pessoa = ?;',
        [params.nome, params.email, params.id_pessoa]
    )

      // Update Psicologo
    await con.execute(
      "UPDATE Psicologo SET valor_hora = ?, especialidade_id = ? WHERE id_psicologo = ?",
      [params.valor_hora, params.especialidade_id, params.id_pessoa]
    );
}