import mongoose from "mongoose";
import authors from "../models/Author.js";

class AuthorController {
  static getAllAuthors = async (req, res) => {
    try {
      const authorsResult = await authors.find();

      res.status(200).json(authorsResult);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  static getAuthorById = async (req, res) => {
    try {
      const id = req.params.id;

      const authorResult = await authors.findById(id);

      if (authorResult !== null) {
        res.status(200).send(authorResult);
      } else {
        res.status(404).send({message: "Author id not found."});
      }
    } catch (erro) {
      if (erro instanceof mongoose.Error.CastError) {
        res.status(400).send({message: "One or more data provided is incorrect."});
      } else {
        res.status(500).send({message: "Internal server error."});
      }
    }
  };

  static addAuthor = async (req, res) => {
    try {
      let author = new authors(req.body);

      const authorResult = await author.save();

      res.status(201).send(authorResult.toJSON());
    } catch (erro) {
      res.status(500).send({message: `${erro.message} - author update failed.`});
    }
  };

  static updateAuthor = async (req, res) => {
    try {
      const id = req.params.id;
  
      await authors.findByIdAndUpdate(id, {$set: req.body});

      res.status(200).send({message: "Author updated successfully"});
    } catch (erro) {
      res.status(500).send({message: erro.message});
    }
  };

  static deleteAuthor = async (req, res) => {
    try {
      const id = req.params.id;

      await authors.findByIdAndDelete(id);

      res.status(200).send({message: "Author deleted successfully"});
    } catch (erro) {
      res.status(500).send({message: erro.message});
    }
  };
}

export default AuthorController