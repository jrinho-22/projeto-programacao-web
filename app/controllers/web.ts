import { sendRoute, webPath } from "../helpers/routes";
import { myApp } from "../server/server";
import path from 'path';
import instance, { UserSession } from "../session/user-session";

myApp.get('/teste', (_req, res) => {
    // Redirect browser to /home
    res.redirect('home');
});

myApp.get('/login', (req: any, res: any) => {

    if (instance.isUserLogged) {
        res.redirect('/home');
    } else {
        res.sendFile(path.join(webPath, 'login/login.html'));
    }   
})

myApp.get('/paciente/cadastro', sendRoute('paciente/cadastro/paciente-cadastro.html'))

myApp.get('/home', sendRoute('home/home.html'));

// myApp.get('*', sendRoute('index.html'));
