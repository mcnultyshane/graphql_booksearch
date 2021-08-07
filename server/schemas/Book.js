const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
    authors: {
        type: String
    },
    description: {
        type: String,
        required: true,
    },
    // Saved book id from GoogleBooks
    bookId: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    link: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
})

const Book = model('Book', bookSchema);

module.exports = Book;