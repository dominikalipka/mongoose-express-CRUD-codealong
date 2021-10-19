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


router.get('/books/create', (req, res) => {
    res.render('books/book-create')
})

router.post('/books/create', (req, res) => {
    const { title, author, description, rating } = req.body;
    Book.create({ title, author, description, rating })
        .then(() => res.redirect('/books'))
        .catch((error) => {
            console.log('Error adding new book to DB');
        })
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

router.get('/books/:bookId/edit', (req, res, next) => {
    Book.findById(req.params.bookId)
        .then((bookFromDB) => {
            res.render('books/book-edit', bookFromDB)
        })
        .catch((error) => {
            console.log('Error loading edit form', error);
            next(error);
        })
    
})

router.post('/books/:bookId/edit', (req, res, next) => {
    const {title, author, description, rating} = req.body;
    Book.findByIdAndUpdate(req.params.bookId, {title, author, description, rating}, { new: true })
        .then((editedBook) => {
            res.redirect('/books/' + editedBook._id)
        })
        .catch((error) => {
            console.log('Error updating book details', error);
        })
})

router.post('/books/:bookId/delete', (req, res, next) => {
    Book.findByIdAndDelete(req.params.bookId)
        .then(() => res.redirect('/books'))
        .catch(error => next(error))
})

module.exports = router;