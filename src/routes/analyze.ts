import { Router } from 'express'
import multer from 'multer'
import { analyzeFoodController } from '../controller/analyzeController'

const router = Router();

const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post("/analyze", upload.single("image"), analyzeFoodController)

export default router