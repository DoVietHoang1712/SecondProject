const {mongoose} = require('../database/database');
const Book = require('./book');

const AuthorSchema = new mongoose.Schema({
    name: {type: String, required: true}
});

    Book.find({author: this.id}, (err, books) => {
        if(err) {
            next(err);
        } else if(books.length > 0){
            throw 'This author has books still';
        } else{
            next();
        }
    })
});

module.exports = mongoose.model('Author', AuthorSchema);