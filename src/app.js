import express from "express"
import dbConnect from "./config/dbConnect.js"
import routes from "./routes/index.js"

const dbConnection = await dbConnect()
dbConnection.on("error", console.error.bind(console, "connection error:"))
dbConnection.once("open", () => {
  console.log("Connected to MongoDB")
})

const app = express()
routes(app)

export default app