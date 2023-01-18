import { Router } from "express";
import userRoutes from "./user";

const router = Router();

router.get('/', (req, res) => {
    res.send('oimonoite')
});

router.use('/user', userRoutes);

export default router;