import books from "../models/Book.js"

class BookController {
  static async getAllBooks(req, res, next) {
    try {
      const booksResult = await books.find()
        .populate("author")
        .exec();

      res.status(200).json(booksResult);
    } catch (error) {
      next(error)
    }
  }

  static async getBookById(req, res, next) {
    try {
      const id = req.params.id;

      const bookResult = await books.findById(id)
        .populate("author", "name")
        .exec();

      res.status(200).send(bookResult);
    } catch (error) {
      next(error)
    }
  }

  static async addBook(req, res, next) {
    try {
      let book = new books(req.body);

      const bookResult = await book.save();

      res.status(201).send(bookResult.toJSON());
    } catch (error) {
      next(error)
    }
  }

  static async updateBook(req, res, next) {
    try {
      const id = req.params.id;
    
      await books.findByIdAndUpdate(id, {$set: req.body});
    
      res.status(200).send({message: "Book updated successfully"});
    } catch (error) {
      next(error)
    }
  }

  static async deleteBook(req, res, next) {
    try {
      const id = req.params.id;

      await books.findByIdAndDelete(id);

      res.status(200).send({message: "Book deleted successfully"});
    } catch (error) {
      next(error)
    }
  }

  static listBookByPublisher = async (req, res, next) => {
    try {
      const publisher = req.query.publisher;
      
      const booksResult = await books.find({"publisher": publisher});

      res.status(200).send(booksResult);
    } catch (error) {
      next(error)
    }
  };
}

export default BookController