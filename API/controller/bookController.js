const createError = require('http-errors')
const bookModel = require('../models/book')


module.exports = {
  testing: async (req, res, next) => {
    try {
      res.send("working Book Routesr")
    } catch (error) {
      createError.NotAcceptable("request can not be proceed")
    }
  },

  // upload a new book 
  newBook: async (req, res, next) => {
    try {
      const data = new bookModel({
        bookType: req.body.bookType,
        bookName: req.body.bookName,
        bookAuthor: req.body.bookAuthor,
        bookEdition: req.body.bookEdition,
        bookPrice: req.body.bookPrice,
        forRent: req.body.forRent,
        noOfPages: req.body.noOfPages,
        language: req.body.language,
        publisher: req.body.publisher,
        bookDescription: req.body.bookDescription,
        // Image:req.body.image
      })
      console.log(data);
      const savedData = await data.save()
      console.log(savedData);
      if (!savedData) {
        return createError.NotAcceptable("can not upload your book details")
      }
      res.json({
        message: "successfully uploaded",
        Details: savedData
      })

    } catch (error) {
      res.send("error is " + error.message)
    }
  },

  allBooks:async(req,res) => {
    try {
      const data = await bookModel.find()
      res.send(data)
    } catch (error) {
      throw createError.NotFound("No Books found")
    }
  },

  searchByType: async (req, res) => {
    try {

      const category = req.params.type 
      const databyType = await bookModel.find({bookType:category})
      res.send(databyType)

      // if (req.params.type) {
      //   const type = req.params.type
      //   const dataByType = await bookModel.find({ bookType: type })
      //   res.send(dataByType)
      // }

    } catch (error) {
      res.send("error")
    }
  },

  searchByAuthor: async (req, res) => {
    try {
      const author = req.params.author
      const data = await bookModel.find({ bookAuthor: author })
      res.send(data)

    } catch (error) {
      res.send("error")
    }
  },

  searchById: async (req, res) => {
    try {
      const id = req.params.id
      const data = await bookModel.findById({ _id: id })

      res.send(data)
    } catch (error) {
      res.send("the error is " + error)
    }
  },

  sortInRange: async (req, res) => {
    try {
      const start = req.params.start
      const end = req.params.end
      const data = await bookModel.find({ bookPrice : { $gt :  start, $lt : end}})

      res.json({
        Sorted:data
      })

    } catch (error) {
      res.json({
        "The error is ": error
      })
    }
  }




}