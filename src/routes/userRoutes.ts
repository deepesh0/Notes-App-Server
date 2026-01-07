import express from 'express';
import { uploadFile } from '../middleware/multer';
import { login, logout, me, register } from '../controllers/user.authentication';
import { authenticate } from '../middleware/authenticate';
import { Role } from '../@types/enum';

const router = express.Router();
const upload = uploadFile()

router.post(
  "/register",
  upload.single("profile_image"),  
  register
);
router.post("/login", login);
router.post("/logout", logout);

router.get("/me",authenticate([Role.ADMIN, Role.USER]),me)

export default router;