import {Router} from 'express'
import multer from 'multer'
import { analyzeFood } from '../controller/analyzeController'

const router = Router();

const storage = multer.diskStorage({
    destination: "src/uploads",
    filename: (_,file,cb) => cb(null,Date.now() + "-" + file.originalname)
})

const upload = multer({storage})

router.post("/analyze",upload.single("image"),analyzeFood)

export default router