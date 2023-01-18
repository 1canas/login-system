import { Response, Request } from "express";

function register(req: Request, res: Response) {
    const dateObject = new Date();

    const { name, email, password, confirm_password } = req.body;

    if (!name) {
        return res.status(422).json({
            statusCode: 422,
            message: "Expected 'name' field",
            timestamp: dateObject.getTime()
        });
    }

    if (!email) {
        return res.status(422).json({
            statusCode: 422,
            message: "Expected 'email' field",
            timestamp: dateObject.getTime()
        });
    }

    if (!password) {
        return res.status(422).json({
            statusCode: 422,
            message: "Expected 'passwword' field",
            timestamp: dateObject.getTime()
        });
    }

    if (password !== confirm_password) {
        return res.status(422).json({
            statusCode: 422,
            message: "Password and confirm password must be equals",
            timestamp: dateObject.getDate()
        });
    }
}

function get(req: Request, res: Response) {
    return res.status(401).send('não impl');
}

function remove(req: Request, res: Response) {
    return res.status(401).send('não impl');
}

function update(req: Request, res: Response) {
    return res.status(401).send('não impl');
}

export const userController = {
    register,
    get,
    remove,
    update
}