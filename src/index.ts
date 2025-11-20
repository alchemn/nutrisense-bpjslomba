import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import analyzeRouter from './routes/analyze'

const port = process.env.PORT || 3000;

const app = express()
app.use(cors())

app.use(express.json())

app.use("/uploads", express.static("src/uploads"))

app.use("/api", analyzeRouter)

app.get("/", (_, res) => {
  res.send("Nutrisense JKN Hore")
})

app.listen(port, () => {
  console.log(`Server Running On http://localhost:${port}`)
})