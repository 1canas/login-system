import { Router } from "express";
import { userController } from "../controllers/userController";

const userRoutes = Router();

userRoutes.post('/saveUser', userController.saveUser);
userRoutes.put('/updateUser', userController.updateUser);
userRoutes.get('/getUser/:id', userController.getUser);
userRoutes.delete('/deleteUser/:id', userController.deleteUser);

export default userRoutes;