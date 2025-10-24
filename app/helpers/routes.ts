import path from 'path';

export const webPath = path.join(__dirname, '../../web')

export const sendRoute = (route: string, req: any, res: any) => {
    console.log('fell', path.join(webPath, route))
    res.sendFile(path.join(webPath, route + "/index.html"));
}