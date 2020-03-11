const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const Author = require('../models/author');

//All router author
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', {
            authors: authors,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/');
    }
})
// new Author router
router.get('/new', async (req, res) => {
    res.render('authors/new', {author: new Author()});
});
router.post('/', async (req, res) => {
    let author = new Author({
        name: req.body.name
    });
    try {
        await author.save();
        res.redirect(`/authors/${author.id}`);
    } catch (error) {
        res.render('/authors/new', {
            errorMessage: 'Error Creating New Author',
            author: author
        });
    }
});
// Get Info by Id
router.get('/:id', async (req, res) => {
    try {
        let author = await Author.findById(req.params.id);
        let books = await Book.find({author: author.id}).limit(6).exec();
        res.render('authors/show', {
            author: author,
            booksByAuthor: books
          });
    } catch (error) {
        res.redirect('/');
    }
});
// Edit id
router.get('/:id/edit', async (req, res) => {
    try {
        let author = await Author.findById(req.params.id);
        res.render('authors/edit', {author: author})
    } catch (error) {
        res.redirect('/authors');
    }
});
//Put id
router.put('/:id', async (req,res) => {
    let author;
    try {
        author = await Author.findById(req.params.id);
        author.name = req.body.name;
        await author.save();
        res.redirect(`/authors/${author.id}`);
    } catch (error) {
        if (author == null) {
            res.redirect('/')
          } else {
            res.render('authors/edit', {
              author: author,
              errorMessage: 'Error updating Author'
            })
        }
    }
});
//Delete id
router.delete('/:id', async(req, res) => {
    let author;
    try {
        author = await Author.findById(req.params.id);
        await author.remove();
        res.redirect('/authors');
    } catch (error) {
        if (author == null) {
            res.redirect('/')
        } else {
            res.redirect(`/authors/${author.id}`)
        }
    }
})
module.exports = router;