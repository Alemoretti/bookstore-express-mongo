import express from "express"

const app = express()
app.use(express.json())

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

function getBookById(id) {
  return books.findIndex(book => book.id === parseInt(id))
}

app.get("/", (req, res) => {
  res.status(200).send("Node.js Course 2")
})

app.get("/books", (req, res) => {
  res.status(200).json(books)
})

app.get("/books/:id", (req, res) => {
  const index = getBookById(req.params.id)
  res.status(200).json(books[index])
})

app.post("/books", (req, res) => {
  books.push(req.body)
  res.status(201).send("Book added successfully")
})

app.put("/books/:id", (req, res) => {
  const index = getBookById(req.params.id)
  books[index].title = req.body.title
  res.status(200).json(books)
})

app.delete("/books/:id", (req, res) => {
  const index = getBookById(req.params.id)
  books.splice(index, 1)
  res.status(200).send("Book deleted successfully")
})

export default app