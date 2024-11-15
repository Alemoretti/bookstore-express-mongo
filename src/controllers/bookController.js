import books from "../models/Book.js"

class BookController {
  static async getAllBooks(req, res) {
    try {
      const booksResult = await books.find()
        .populate("author")
        .exec();

      res.status(200).json(booksResult);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getBookById(req, res) {
    try {
      const id = req.params.id;

      const bookResult = await books.findById(id)
        .populate("author", "name")
        .exec();

      res.status(200).send(bookResult);
    } catch (error) {
      res.status(400).send({message: `${error.message} - Id do livro não localizado.`});
    }
  }

  static async addBook(req, res) {
    try {
      let book = new books(req.body);

      const bookResult = await book.save();

      res.status(201).send(bookResult.toJSON());
    } catch (error) {
      res.status(500).send({message: `${error.message} - failed to update book.`});
    }
  }

  static async updateBook(req, res) {
    try {
      const id = req.params.id;
    
      await books.findByIdAndUpdate(id, {$set: req.body});
    
      res.status(200).send({message: "Book updated successfully"});
    } catch (error) {
      res.status(500).send({message: error.message});
    }
  }

  static async deleteBook(req, res) {
    try {
      const id = req.params.id;

      await books.findByIdAndDelete(id);

      res.status(200).send({message: "Book deleted successfully"});
    } catch (error) {
      res.status(500).send({message: error.message});
    }
  }

  static listBookByPublisher = async (req, res) => {
    try {
      const publisher = req.query.publisher;
      
      const booksResult = await books.find({"publisher": publisher});

      res.status(200).send(booksResult);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

export default BookController