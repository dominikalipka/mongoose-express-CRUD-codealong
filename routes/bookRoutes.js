const router = require("express").Router();
const Book = require('../models/Book.model.js');


router.get('/books', (req, res, next) => {
    Book.find()
        .then((listOfBooks) => {
           const data = {
               bookList: listOfBooks
           }
           res.render('books/books-list', data) 
        })
        .catch((error) => {
            console.log('An error occured, could not load books list', error);
            next(error);
        });
})

router.get('/books/:bookId', (req, res) => {
    Book.findById(req.params.bookId)
        .then((bookDetails) => {
            res.render('books/book-details.hbs', bookDetails)
        })
        .catch((error) => {
            console.log('Error: could not load book details', error);
            next(error);
        })

    
})


module.exports = router;