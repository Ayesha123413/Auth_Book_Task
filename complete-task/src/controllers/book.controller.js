const booksCollection = require('../collections/BookColletion')

const createbookController = (req, res) => {
  const { title, author, genre, publicationYear } = req.body
  // Create a new book document in the 'books' collection
  booksCollection
    .add({ title, author, genre, publicationYear: Number(publicationYear) })
    .then((ref) => {
      return res
        .status(201)
        .json({ message: 'Book created successfully', id: ref.id })
    })
    .catch((error) => {
      console.error('Error creating book:', error)
      return res.status(500).json({ message: 'Internal server error' })
    })
}

// Retrieve all books from the 'books' collection
const getAllBooks = (req, res) => {
  booksCollection
    .get()
    .then((snapshot) => {
      const books = []
      //get data of each book one by one and join it with id and push it into books array
      snapshot.forEach((doc) => {
        const data = doc.data()
        data.id = doc.id
        books.push(data)
      })
      return res.status(200).json(books)
    })
    .catch((error) => {
      console.error('Error getting books:', error)
      return res.status(500).json({ message: 'Internal server error' })
    })
}

//Update book

const updatebook = (req, res) => {
  const bookId = req.params.id
  const { title, author, genre, publicationYear } = req.body

  // Update the book with the given ID in the 'books' collection
  booksCollection
    .doc(bookId)
    .update({
      title,
      author,
      genre,
      publicationYear: Number(publicationYear),
    })
    .then(() => {
      return res.status(200).json({ message: 'Book updated successfully' })
    })
    .catch((error) => {
      console.error('Error updating book:', error)
      return res.status(500).json({ message: 'Internal server error' })
    })
}

const deleteBook = (req, res) => {
  const bookId = req.params.id

  // Delete the book with the given ID from the 'books' collection
  booksCollection
    .doc(bookId)
    .delete()
    .then(() => {
      return res.status(200).json({ message: 'Book deleted successfully' })
    })
    .catch((error) => {
      console.error('Error deleting book:', error)
      return res.status(500).json({ message: 'Internal server error' })
    })
}

const getSingleBook = (req, res) => {
  const bookId = req.params.id
  booksCollection
    .doc(bookId)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ message: 'Book not found' })
      }
      const bookData = doc.data()
      return res.status(200).json(bookData)
    })
    .catch((error) => {
      console.error('Error fetching book:', error)
      return res.status(500).json({ message: 'Internal server error' })
    })
}

module.exports = {
  createbookController,
  getAllBooks,
  updatebook,
  deleteBook,
  getSingleBook,
}
