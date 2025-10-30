import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const port = process.env.PORT || 3338

const app = express()

app.use(cors())
app.use(express.json())



app.get("/", (req, res) => {
  res.status(201).json({ oke: true });
});

app.listen(port,() => {
    console.log(`Server Yuhu on ${port}`)
})

