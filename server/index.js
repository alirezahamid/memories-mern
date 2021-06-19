/* Imports */
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import "dotenv/config"
import "./helpers/db_config.js"

import postRoutes from "./routes/posts.routes.js"

const app = express()

/* App use */
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

app.use("/posts", postRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
