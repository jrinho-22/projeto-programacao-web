// import { port } from "../helpers/const";
// import express from 'express';
// import cors from 'cors';
// // import useMiddleware from "./middleware";
// import { Express } from "express-serve-static-core";

// export class Server {
//     static _instance: Server | null = null;
//     private _app: Express = express();
//     private _api: any[] = [] 
//     private teste = ''

//     constructor() {
//         if (!Server._instance) {
//             Server._instance = this;
//             this._app.use(cors()) 
//         }

//         return Server._instance;
//     }

//     listen() {
//         this._app.listen(port, () => {
//             console.log(`Server is running at http://localhost:${port}`);
//         });
//     }

//     get app() {
//         return this._app
//     }

//     set app(newApp: Express) {
//         this._app = newApp
//     }
// }

// const instance = new Server()

// // useMiddleware(instance)

// export default instance