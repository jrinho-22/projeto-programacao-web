import { checkUserBlocked, sendRoute, webPath } from "../helpers/routes";
import { myApp } from "../server/server";
import path from 'path';
import express from 'express';

const fs = require('fs').promises;

 myApp.get('*', async(_req, res, next) => {

    const userType = _req.cookies.userType;
    const searchPath = _req.originalUrl
    const folderPath = path.join(process.cwd(), 'web', searchPath);
    
    await fs.access(folderPath)
    .then((v: any) => {
        if(checkUserBlocked(userType || 0, searchPath.replace(/\//g, "")) == true) {
            res.redirect('/pagina-restrita/');
        } else {
            next()
        }
    })
    .catch((erro: any) => {
        sendRoute("not-found", _req, res)
    });
});

myApp.use(express.static(path.join(__dirname, '../../web')));