import { author } from "../models/Author.js"

class AuthorController {
  static async getAllAuthors(req, res) {
    try {
      const authorList = await author.find({})
      res.status(200).send(authorList)
    } catch (error) {
      res.status(500).json({
        message: `${error.message} - Failed to get authors list.` 
      })
    }
  }

  static async addAuthor(req, res) {
    try {
      const newAuthor = await author.create(req.body)
      res.status(201).json({
        message: "Author added successfully",
        author: newAuthor
      })
    } catch (error) {
      res.status(500).json({
        message: `${error.message} - Failed to add author.` 
      })
    }
  }
  
  static async getAuthorById(req, res) {
    try {
      const authorFound = await author.findById(req.params.id)
      res.status(201).json({
        message: "Author updated successfully",
        authorFound
      })
    } catch (error) {
      res.status(500).json({
        message: `${error.message} - Failed to update author.` 
      })
    }
  }

  static async updateAuthorById(req, res) {
    try {
      await author.findByIdAndUpdate(req.params.id, req.body)
      res.status(200).json({message: "Author updated successfully",})
    } catch (error) {
      res.status(500).json({
        message: `${error.message} - Failed to get author.` 
      })
    }
  }

  static async deleteAuthorById(req, res) {
    try {
      await author.findByIdAndDelete(req.params.id)
      res.status(200).send("Author deleted successfully")
    } catch (error) {
      res.status(500).json({
        message: `${error.message} - Failed to delete author.` 
      })
    }
  }
}

export default AuthorController