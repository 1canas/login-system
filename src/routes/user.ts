import { Router } from "express";
import { userController } from "../controllers/userController";

const userRoutes = Router();

userRoutes.post('/regiterUser', userController.removeUser);
userRoutes.put('/updateUser', userController.updateUser);
userRoutes.get('/getUser/:id', userController.getUser);
userRoutes.delete('/removeUser/:id', userController.removeUser);

export default userRoutes;