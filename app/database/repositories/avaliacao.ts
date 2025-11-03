import { connection } from "../connection";

const allAvaliacaoByPsicologoQuery = (psicologoId: number) => `SELECT p2.nome as 'nomePaciente', a.avaliacao, a.comentario
FROM Avaliacao a Join Consulta c on c.id_consulta = a.id_consulta
join Psicologo p on p.id_psicologo = c.id_psicologo join Pessoa p2 on p2.id_pessoa = c.id_paciente WHERE 
p.id_psicologo = ${psicologoId}`

const allAvaliacaoQuery = `SELECT p2.nome as 'nomePsicologo', AVG(a.avaliacao) AS mediaAvaliacao
FROM Avaliacao a 
Join Consulta c on c.id_consulta = a.id_consulta
join Psicologo p on p.id_psicologo = c.id_psicologo
join Pessoa p2 on p2.id_pessoa = p.id_psicologo
GROUP BY p2.nome`

export const registrarAvaliacao = async (payload: any) => {
  let con = await connection();
  const [result] = await con.execute(
    `INSERT INTO Avaliacao (id_consulta, avaliacao, comentario) VALUES (${payload.consultaId}, ${payload.avaliacao}, '${payload.comentario}')`
  );

  return true
};

export async function getAvaliacoes(psicologoId: number) {
  let con = await connection();
    const [rows] = await con.execute(allAvaliacaoByPsicologoQuery(psicologoId));

  return rows;
}

export async function getAvaliacoesAll() {
  let con = await connection();
    const [rows] = await con.execute(allAvaliacaoQuery);

  return rows;
}
