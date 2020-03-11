const {mongoose} = require('../database/database');

const BookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    publishDate: {type: String, required: true},
    pageCount: {type: String, required: true},
    createAt: {type: Date, default: Date.now},
    coverImage: {type: Buffer, required: true},
    coverImageType: {type: String, required: true},
    // Truong tham chieu
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'Author'}
});

BookSchema.virtual('coverImagePath').get(function () {
    if(this.coverImage != null && this.coverImageType != null){
        return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
    }
});

module.exports = mongoose.model('Book', BookSchema);