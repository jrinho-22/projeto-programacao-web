import { connection } from "../connection";

export const getAllEspecialidades = async () => {
  let con = await connection();
  const [result] = await con.execute('SELECT * FROM Especialidades')

  return result
};