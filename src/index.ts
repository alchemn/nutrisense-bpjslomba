import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import analyzeRouter from './routes/analyze'

const port = process.env.PORT

const app = express()
app.use(cors())

app.use("/uploads",express.static("src/uploads"))

app.use("/api",analyzeRouter)
app.use(express.json())
app.get("/",(_,res) => {
  res.send("Nutrisense JKN Hore")
})


app.listen(port, () => {
  console.log(`Server Running On ${port}`)
})