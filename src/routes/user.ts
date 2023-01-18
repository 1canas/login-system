import { Router } from "express";
import { userController } from "../controllers/userController";

const userRoutes = Router();

userRoutes.post('/register', userController.register);
userRoutes.put('/update',  userController.update);
userRoutes.delete('/remove/:id',  userController.remove);
userRoutes.get('/:id', userController.get);

export default userRoutes;