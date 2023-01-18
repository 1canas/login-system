import { Router } from "express";
import { authMiddleware, userController } from "../controllers/userController";

const userRoutes = Router();

userRoutes.post('/register', userController.register);
userRoutes.put('/update',  userController.update);
userRoutes.delete('/remove', authMiddleware, userController.remove);
userRoutes.get('/:id', authMiddleware, userController.get);

export default userRoutes;