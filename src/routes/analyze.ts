import { Router } from 'express'
import multer from 'multer'
import { analyzeFoodController, countAnalyze, getHistoryController, getWeeklySummaryController, getAggregateMetricsController, getDailyHealthTipsController } from '../controller/analyzeController'
import { authMiddleware } from '../middleware/auth';

const router = Router();

const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post("/analyze", authMiddleware, upload.single("image"), analyzeFoodController)
router.get("/analyze",authMiddleware,countAnalyze)
router.get("/analyze/history", authMiddleware, getHistoryController)
router.get("/analyze/weekly-summary", authMiddleware, getWeeklySummaryController)
router.get("/analyze/metrics", authMiddleware, getAggregateMetricsController)
router.get("/analyze/health-tips", authMiddleware, getDailyHealthTipsController)

export default router