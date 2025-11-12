import instance from "../../session/user-session";
import { connection } from "../connection";

export async function inativarPessoa(id_pessoa: any) {
  let con = await connection();

  const [rows] = await con.execute("UPDATE Pessoa SET status = 0 WHERE id_pessoa = ?;",
   [id_pessoa])

  return true;
}

export async function ativarPessoa(id_pessoa: any) {
  let con = await connection();

  const [rows] = await con.execute("UPDATE Pessoa SET status = 1 WHERE id_pessoa = ?;",
   [id_pessoa])

  return true;
}