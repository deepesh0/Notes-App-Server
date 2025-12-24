import express from 'express'
import { create, getAll, clearAll } from '../controllers/favourite.controllers';
import { authenticate } from '../middleware/authenticate';
import { Role } from '../@types/enum';


const router = express.Router()

router.post("/",authenticate([Role.USER]),create); 

router.get("/",authenticate([Role.USER]),getAll );

router.delete("/",authenticate([Role.USER]),clearAll);

export default router