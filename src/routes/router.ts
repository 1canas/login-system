import { Router } from "express";
import { UserRoutes } from "./UserRoutes";
import {AuthRoutes} from "./AuthRoutes";

const router = Router();
const userRoutes = new UserRoutes(Router());
const authRoutes = new AuthRoutes(Router());

router.get("/", (req, res) => {
  res.send("oimonoite");
});

router.use("/user", userRoutes.initRoutes());
router.use("/auth", authRoutes.initRoutes());

export default router;
