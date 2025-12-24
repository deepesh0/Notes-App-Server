import express from 'express';
import { uploadFile } from '../middleware/multer';
import { login, register } from '../controllers/user.authentication';

const router = express.Router();
const upload = uploadFile()


router.post("/register", upload.single("profile_image"), register);
router.post("/login", login);

export default router;