import { User } from "../models/User";
import { Response, Request } from "express";

function saveUser(req: Request, res: Response) {
    return res.status(401).send('nao impl');
}

function getUser(req: Request, res: Response) {
    return res.status(401).send('não impl');
}

function deleteUser(req: Request, res: Response) {
    return res.status(401).send('não impl');
}

function updateUser(req: Request, res: Response) {
    return res.status(401).send('não impl');
}

export const userController = {
    saveUser,
    getUser,
    deleteUser,
    updateUser
}