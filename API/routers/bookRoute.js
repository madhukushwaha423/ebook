const express = require('express')
const multer = require('multer')
const util = require('util')
const router = new express.Router()
const fs = require('fs')
const { testing, newBook, searchByType, searchByAuthor, searchById, sortInRange, allBooks } = require('../controller/bookController')
const Book = require('../models/book')

const storage = multer.diskStorage({
  destination:function(req,file,cb) {
    cb(null , 'uploads/')
  },
  filename:function (req, file , cb){
    cb(null, new Date().toISOString().replace(/:/g, '-')+ file.originalname);  }
})

const fileFilter = (req, file,cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null,true)
  }
  else{
    cb(null,false);
  }
}

const upload =  multer({
  storage:storage,
  limits:1024*1024*5,
  fileFilter:fileFilter
})

router.post('/uploadbook',upload.single('image'), (req, res, next) => {
  // const url = req.protocol + '://'+ req.get("host");  
  console.log(req.file);
  const book = new Book({
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
    image:req.file.path
  });

  // console.log(req.file.filename);

  book.save().then(
    result => {
      console.log(result);
      res.status(201).json({
        message: " Book saved successfully :) ",
        BookCreated: {
          data:result,
          _id: result._id,
          bookName: result.bookName,
        }
      })
    }
  )
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
        msg : "went wrong"
      })
    })
})


// router.post('/book/uploadBook', newBook);
router.get('/book', testing)
router.get('/book/books', allBooks)
router.get('/book/searchByType/:type', searchByType)
router.get('/book/searchByAuthor/:author', searchByAuthor)
router.get('/book/searchById/:id', searchById)
router.get('/book/searchById/:start/:end', sortInRange);
module.exports = router



//for initialization of multer 
// let storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, __basedir + "/resources/static/assets/uploads/");
//   },
//   filename: (req, file, cb) => {
//     console.log(file.originalname);
//     cb(null, file.originalname);
//   },
// });

// let uploadFile = multer({
//   storage: storage,
//   limits: { fileSize: maxSize },
// }).single("file");

// let uploadFileMiddleware = util.promisify(uploadFile);
// module.exports = uploadFileMiddleware;



// const upload = async (req, res) => {
//   try {
//     await uploadFile(req, res);

//     if (req.file == undefined) {
//       return res.status(400).json({
//         message: "Please upload a file  !!!"
//       })
//     };
//   } catch (error) {

//     if (err.code == "LIMIT_FILE_SIZE") {
//       return res.status(500).send({
//         message: "File size cannot be larger than 2MB!",
//       });
//     }

//     res.status(500).json({
//       message: `could not upload a file ${req.file.originalname} . ${error}`
//     })
//   }
// }

// const getListFiles = (req, res) => {
//   const directoryPath = __basedir + "/resources/static/assets/uploads/";

//   fs.readdir(directoryPath, function (err, files) {
//     if (err) {
//       res.status(500).send({
//         message: "Unable to scan files!",
//       });
//     }

//     let fileInfos = [];

//     files.forEach((file) => {
//       fileInfos.push({
//         name: file,
//         url: baseUrl + file,
//       });
//     });

//     res.status(200).send(fileInfos);
//   });
// };


//to download a fil e
// const download = (req, res) => {
//   const fileName = req.params.name;
//   const directoryPath = __basedir + "/resources/static/assets/uploads/";

//   res.download(directoryPath + fileName, fileName, (err) => {
//     if (err) {
//       res.status(500).send({
//         message: "Could not download the file. " + err,
//       });
//     }
//   });
// };
