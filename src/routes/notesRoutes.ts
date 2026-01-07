import express from 'express';
import {updateNote,getAllNotes,getNotebyId,deleteNote,  createNote} from "../controllers/notesControllers";
import { uploadFile } from '../middleware/multer';
import { authenticate } from '../middleware/authenticate';
import { Role } from '../@types/enum';



const router = express.Router();
const upload = uploadFile()


router.get("/", getAllNotes); 

router.get("/:id", getNotebyId);

router.post("/", upload.single("photo"),authenticate([Role.USER]),createNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);




export default router;
