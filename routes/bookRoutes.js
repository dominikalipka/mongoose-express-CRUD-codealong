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
            console.log('An error occured: ', error);
            next(error);
        });
})

module.exports = router;