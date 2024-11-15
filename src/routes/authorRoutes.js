import express from "express"
import AuthorController from "../controllers/authorController.js"

const router = express.Router()

router.get("/authors", AuthorController.getAllAuthors)
router.get("/authors/:id", AuthorController.getAuthorById)
router.post("/authors", AuthorController.addAuthor)
router.put("/authors/:id", AuthorController.updateAuthor)
router.delete("/authors/:id", AuthorController.deleteAuthor)


export default router