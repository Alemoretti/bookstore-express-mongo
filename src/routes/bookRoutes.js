import express from "express"
import BookController from "../controllers/bookController.js"

const routes = express.Router()

routes.get("/books", BookController.getAllBooks)
routes.get("/books/:id", BookController.getBookById)
routes.post("/books", BookController.addBook)
routes.put("/books/:id", BookController.updateBookById)
routes.delete("/books/:id", BookController.deleteBookById)


export default routes