import { Router } from 'express'
import multer from 'multer'
import { analyzeFoodController } from '../controller/analyzeController'
import { authMiddleware } from '../middleware/auth';

const router = Router();

const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post("/analyze", authMiddleware, upload.single("image"), analyzeFoodController)

export default router