import { Response, Request } from "express";

function registerUser(req: Request, res: Response) {
    return res.status(401).send('nao impl');
}

function getUser(req: Request, res: Response) {
    return res.status(401).send('não impl');
}

function removeUser(req: Request, res: Response) {
    return res.status(401).send('não impl');
}

function updateUser(req: Request, res: Response) {
    return res.status(401).send('não impl');
}

export const userController = {
    registerUser,
    getUser,
    removeUser,
    updateUser
}