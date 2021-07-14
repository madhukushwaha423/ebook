const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    bookType: {
        type: String,
        lowecase:true
    },
    bookName: {
        type: String,
        // reuired: true
    },
    bookAuthor: {
        type: String,
        // required: true,
    },
    bookEdition: {
        type: String,
        // required: true
    },
    bookPrice: {
        type: String,
        // require: true
    },
    forRent: {
        type: String,
        // required: true
    },
    noOfPages: {
        type: Number,
    },
    language: {
        type: String
    },
    publisher: {
        type: String
    },
    rating: {
        type: String
    },
    bookDescription: {
        type: String
    },
    image: {
        type: String
    }
})

const Book = mongoose.model('Book', bookSchema)
module.exports = Book