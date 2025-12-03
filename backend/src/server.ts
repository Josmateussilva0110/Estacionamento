import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (request, response) => {
  response.json({ status: "API rodando com TypeScript 🚀" })
})

const PORT = 8080

app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando na porta ${PORT}`)
})

