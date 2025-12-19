import express, { Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import session from "express-session"
import PgSession from "connect-pg-simple"
import { Pool } from "pg"
import router from "../src/routes/routes"

dotenv.config()

const app = express()


const pgPool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  ssl: false
})



const PostgresSession = PgSession(session)

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))



app.use(express.json())

app.use(
  session({
    store: new PostgresSession({
      pool: pgPool,
      tableName: "session",
      createTableIfMissing: true,
      ttl: 60 * 60 * 2,
      pruneSessionInterval: 60 * 30,
    }),
    secret: process.env.SECRET || "fallback_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, 
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 2, // 2 horas
      //maxAge: 1000 * 15, // 15 segundos
    },
  })
)

app.get("/", (request: Request, response: Response) => {
  response.json({ status: "API rodando com TypeScript 🚀" })
})

app.use("/", router)

const PORT = 8080

app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando na porta ${PORT}`)
})
