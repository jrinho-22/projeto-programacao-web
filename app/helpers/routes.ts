import path from 'path';

export const webPath = path.join(__dirname, '../../web')

export const sendRoute = (route: string, req: any, res: any) => {
    res.sendFile(path.join(webPath, route + "/index.html"));
}

export const permissionsBlocked: Record<number, string[]> = {
  0: ["psicologo-home", "paciente-home", "admin-home"],
  1: ["paciente-home", "admin-home"],
  2: ["psicologo-home", "admin-home"], 
  3: ["psicologo-home", "paciente-home"]
};

export const checkUserBlocked = (userType: number, route: string) => {
    let notAllowedRoutes = permissionsBlocked[userType]
    return notAllowedRoutes.includes(route)
}