import { connection } from "../connection";

export const agendarConsulta = async (payload: any) => {
  let con = await connection();
  const [result] = await con.execute(
    "INSERT INTO Consulta (id_paciente, id_psicologo, data, horario, status) VALUES (?, ?, ?, ?, 1)",
    [payload.pacienteId, payload.psicologoId, payload.data, payload.hora]
  );
};

export const cancelarConsulta = async (consultaId: any) => {
  let con = await connection();
  await con.execute(`UPDATE Consulta SET status = 'Cancelada' WHERE id_consulta = ${consultaId}`);
  return true
};

export async function getConsultas(userdId = null, psicologoId = null) {
  let con = await connection();
  let rows
    if (userdId) {
        [rows] = await con.execute("SELECT * FROM Consulta WHERE id_paciente = ?", [userdId]);
    } else {
        [rows] = await con.execute("SELECT * FROM Consulta WHERE id_psicologo = ?", [psicologoId]);
    } 

  

  return rows;
}
