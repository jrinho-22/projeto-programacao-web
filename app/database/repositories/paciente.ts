import instance from "../../session/user-session";
import { connection } from "../connection";

export async function getPacientes() {
  let con = await connection();

  const [rows] = await con.execute("SELECT * FROM Pessoa pe JOIN Paciente pa ON pa.id_paciente = pe.id_pessoa WHERE pe.tipo_pessoa_id = 2 ");

  return rows;
}

export async function savePaciente(params: any) {
  let con = await connection();
  let [res] = (await con.execute(
    "INSERT INTO Login (usuario, senha) VALUES (?, ?)",
    [params.usuario, params.senha]
  )) as any;

  await con.execute(
    "INSERT INTO Pessoa (id_pessoa, nome, email, tipo_pessoa_id) VALUES (?, ?, ?, ?)",
    [res.insertId, params.nome, params.email, 2]
  );

  await con.execute(
    "INSERT INTO Paciente (id_paciente, cpf, idade) VALUES (?, ?, ?)",
    [res.insertId, params.cpf, params.idade]
  );

  return {id: res.insertId}
}

export async function updatePaciente(params: any) {
  const con = await connection();

  // Update Pessoa
  await con.execute(
    "UPDATE Pessoa SET nome = ?, email = ? WHERE id_pessoa = ?",
    [params.nome, params.email, params.id_pessoa]
  );

  // Update Paciente
  await con.execute(
    "UPDATE Paciente SET idade = ? WHERE id_paciente = ?",
    [params.cpf, params.idade, params.id_pessoa]
  );
}
