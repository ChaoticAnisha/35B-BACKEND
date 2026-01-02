import { Router } from "express";
// import admin controller
import { AdminUserController } from "../../controllers/admin/user.controller";
import { authorizedMiddleware } from "../../middlewares/authorized.middleware";

let adminUserController = new AdminUserController();
const router = Router();

router.get("/:id", authorizedMiddleware, adminUserController.getOneUser);
//define admin user router;

export default router;