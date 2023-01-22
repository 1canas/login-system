import { Router } from "express";
import { UserRoutes } from "./UserRoutes";

const router = Router();
const userRoutes = new UserRoutes(Router());

router.get("/", (req, res) => {
  res.send("oimonoite");
});

router.use("/user", userRoutes.initRoutes());
// router.use("/auth", authRoutes);

export default router;
