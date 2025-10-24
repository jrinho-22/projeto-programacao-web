import { sendRoute, webPath } from "../helpers/routes";
import { myApp } from "../server/server";
import path from 'path';
const fs = require('fs').promises;

 myApp.get('*', (_req, res) => {
    const searchPath = _req.originalUrl
    const folderPath = path.join(process.cwd(), 'web', searchPath);
    
    fs.access(folderPath)
    .catch((erro: any) => {
        sendRoute("not-found", _req, res)
    });
});