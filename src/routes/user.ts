import { Router } from "express";

import UserController,  { userController } from "../controllers/userController";

import { authService } from "../services/authService";

const userControllerObject = new UserController();

const userRoutes = Router();

userRoutes.post('/register', userControllerObject.register);
userRoutes.put('/update',  userController.update);
userRoutes.delete('/remove', authService, userController.remove);
userRoutes.get('/:id', authService, userController.get);

export default userRoutes;