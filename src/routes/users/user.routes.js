import { Router } from "express";
import { registerUser } from "../../controllers/users/user.controller.js";
import { upload } from "../../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(upload.single("avatar"), registerUser);
// output http://localhost:8000/api/v1/metoradecor/users/register
export default router;
