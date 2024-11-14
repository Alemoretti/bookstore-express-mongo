import book from "../models/Book.js"
import { author } from "../models/Author.js"

class BookController {
  static async getAllBooks(req, res) {
    try {
      const bookList = await book.find({})
      res.status(200).send(bookList)
    } catch (error) {
      res.status(500).json({
        message: `${error.message} - Failed to get books list.` 
      })
    }
  }

  static async addBook(req, res) {
    const newBook = req.body
    try {
      const authorFound = await author.findById(newBook.author)
      const bookWithAuthor = { ...newBook, author: { ...authorFound._doc } }
      const createdBook = await book.create(bookWithAuthor)
      res.status(201).json({
        message: "Book added successfully",
        book: createdBook
      })
    } catch (error) {
      res.status(500).json({
        message: `${error.message} - Failed to add book.` 
      })
    }
  }
  
  static async getBookById(req, res) {
    try {
      const bookFound = await book.findById(req.params.id)
      res.status(201).json({
        message: "Book updated successfully",
        bookFound
      })
    } catch (error) {
      res.status(500).json({
        message: `${error.message} - Failed to update book.` 
      })
    }
  }

  static async updateBookById(req, res) {
    try {
      await book.findByIdAndUpdate(req.params.id, req.body)
      res.status(200).json({message: "Book updated successfully",})
    } catch (error) {
      res.status(500).json({
        message: `${error.message} - Failed to get book.` 
      })
    }
  }

  static async deleteBookById(req, res) {
    try {
      await book.findByIdAndDelete(req.params.id)
      res.status(200).send("Book deleted successfully")
    } catch (error) {
      res.status(500).json({
        message: `${error.message} - Failed to delete book.` 
      })
    }
  }
}

export default BookController