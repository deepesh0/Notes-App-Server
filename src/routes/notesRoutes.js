import express from 'express';
import {updateNotes,getAllNotes,getNotebyId,deleteNotes,  createNotes,} from "../controllers/notesControllers.js";

const router = express.Router();

router.get("/", getAllNotes); 

router.get("/:id", getNotebyId);

router.post("/", createNotes);

router.put("/:id", updateNotes);

router.delete("/:id", deleteNotes);




export default router;
