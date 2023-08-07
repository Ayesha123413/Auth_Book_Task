const db = require('../config')

const booksCollection = db.collection('books');

module.exports = booksCollection