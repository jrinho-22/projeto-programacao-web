import fs from "fs";
import express from 'express';
import path from 'path';
import { myApp } from "./app/server/server";
import "./app/server/middleware" 
import "./app/controllers/index"
async function main() {

  const PORT = 3000;

  myApp.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

main().catch(console.error);
