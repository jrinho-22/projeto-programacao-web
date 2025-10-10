import fs from "fs";
import express from 'express';
import path from 'path';
import { myApp } from "./app/server/server";
import "./app/server/middleware" 
import "./app/controllers/index"
async function main() {

  // const [rows] = await connection.query("SELECT NOW() as currentTime");
  // console.log(rows)
  // await connection.end();
  const PORT = 3000;

  // API endpoint example
  myApp.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

main().catch(console.error);
