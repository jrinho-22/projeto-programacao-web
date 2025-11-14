import { connection } from "../connection";

// statusConsulta = {
//   cancelada: 1
//   agendada: 2
//   concluida:3
// }

export const agendarConsulta = async (payload: any) => {
  let con = await connection();
  const [result] = await con.execute(
    "INSERT INTO Consulta (id_paciente, id_psicologo, data, horario, status_consulta_id) VALUES (?, ?, ?, ?, 2)",
    [payload.pacienteId, payload.psicologoId, payload.data, payload.hora]
  );
};

export const cancelarConsulta = async (consultaId: any) => {
  let con = await connection();
  await con.execute(`UPDATE Consulta SET status_consulta_id = 1 WHERE id_consulta = ${consultaId}`);
  return true
};

export const concluirConsulta = async (consultaId: any) => {
  let con = await connection();
  await con.execute(`UPDATE Consulta SET status_consulta_id = 3 WHERE id_consulta = ${consultaId}`);
  return true
};

export async function getConsultas(userdId = null, psicologoId = null) {
  let con = await connection();
  let rows
    if (userdId) {
        [rows] = await con.execute("SELECT * FROM Consulta c JOIN Psicologo p ON p.id_psicologo = c.id_psicologo WHERE c.id_paciente = ?", [userdId]);
    } else {
        [rows] = await con.execute("SELECT * FROM Consulta c JOIN Pessoa p ON p.id_pessoa = c.id_paciente WHERE id_psicologo = ?", [psicologoId]);
    } 

  

  return rows;
}
