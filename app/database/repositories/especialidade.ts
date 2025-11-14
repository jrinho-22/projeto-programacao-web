import { connection } from "../connection";

export const getAllEspecialidades = async () => {
  let con = await connection();
  const [result] = await con.execute("SELECT * FROM Especialidades");

  return result;
};

export const updateEspecialidade = async (id: any, descricao: any) => {
  let con = await connection();
  const [result] = await con.execute(
    "UPDATE Especialidades SET descricao = ? WHERE id_especialidade = ? ",
    [descricao, id]
  );
  return result;
};

export const addEspecialidade = async (descricao: any) => {
  let con = await connection();
  const [result] = await con.execute(
    "INSERT INTO Especialidades (descricao) VALUES (?)",
    [descricao]
  );
  return result;
};

export const deleteEspecialidade = async (id: any) => {
  const con = await connection();
  try {
    await con.execute("DELETE FROM Especialidades WHERE id_especialidade = ?", [
      id,
    ]);
  } catch (error) {
    throw Error(
      "ERRO: Existem Psicologos cadastrados nessa especialidade"
    );
  }
  return true;
};
