const express = require("express");
const router = express.Router();
const { createbookController, getAllBooks, updatebook, deleteBook, getSingleBook } = require("../controllers/book.controller")
const { bookValidationRules, validate } = require('../middlewares/validatore');
const auth = require("../middlewares/Auth.middleware");

/**
 * @swagger
 * /book:
 *   post:
 *     summary: Create a new book
 *     description: Creates a new book in the collection
 *     parameters:
 *       - in: formData
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *       - in: formData
 *         name: author
 *         required: true
 *         schema:
 *           type: string
 *       - in: formData
 *         name: genre
 *         required: true
 *         schema:
 *           type: string
 *       - in: formData
 *         name: publicationYear
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Book created successfully
 *       422:
 *         description: Validation error
 */
router.post('/', bookValidationRules, validate, createbookController);

/**
 * @swagger
 * /book:
 *   get:
 *     summary: Get all books
 *     description: Retrieves a list of all books in the collection
 *     responses:
 *       200:
 *         description: Books found successfully
 *       404:
 *         description: No books found
 */
router.get("/", auth, getAllBooks)

/**
 * @swagger
 * /{bookId}:
 *   put:
 *     summary: Update a book by ID
 *     description: Updates a book in the collection by its ID
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               genre:
 *                 type: string
 *               publicationYear:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       404:
 *         description: Book not found
 *       422:
 *         description: Validation error
 */
router.put("/:id", auth, bookValidationRules, validate, updatebook)

/**
 * @swagger
 * /books/{bookId}:
 *   delete:
 *     summary: Delete a book by ID
 *     description: Deletes a book from the collection by its ID
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book to delete
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 */
router.delete("/:id",auth, deleteBook)


router.get("/:id", auth, getSingleBook)

module.exports = router;