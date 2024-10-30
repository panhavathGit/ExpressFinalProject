import { Router } from "express";
import { loginController, registerController } from "../controller/authentication_controller.js";
import { upload } from "../utils/file_upload_handler.js";

const authRouter = Router();

authRouter.post('/register',upload.single('user_profile'),registerController);
authRouter.post('/login',loginController);

export default authRouter;


