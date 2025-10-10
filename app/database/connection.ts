import mysql from "mysql2/promise";

export const connection = mysql.createConnection({
    host: "mysql-3a5cf060-jrinho222-6ccf.e.aivencloud.com",
    port: 27735,
    user: "avnadmin",
    password: "AVNS_0ibOehUvKXvL1GfJ4Dv",
    database: "defaultdb",
    ssl: {
      rejectUnauthorized: false // exige SSL válido
      // se precisar de certificado raiz fornecido pelo Aiven, pode colocar assim:
      // ca: fs.readFileSync("ca.pem")
    }
  });