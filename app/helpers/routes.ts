import path from 'path';

export const webPath = path.join(__dirname, '../../web')

export const sendRoute = (route: string) => {
    return (req: any, res: any) => {
        res.sendFile(path.join(webPath, route));
    }
}

export const baseRequest = (req: any, res: any) => {
    res.sendFile(path.join());
}