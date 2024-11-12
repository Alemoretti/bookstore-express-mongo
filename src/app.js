import express from "express"

const app = express()

const books = [
  {
    id: 1,
    title: "Lord of the rings",
  },
  {
    id: 2,
    title: "The Hobbit",
  }
]

app.get("/", (req, res) => {
  res.status(200).send("Node.js Course 2")
})

app.get("/books", (req, res) => {
  res.status(200).json(books)
})

export default app