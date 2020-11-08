const mongoose = require('mongoose')

const CategoriesSchema = mongoose.Schema({
    Name: {
        type: String,
        require: true
    },
    Description: {
        type: String,
        require: true
    }
});


module.exports = Categories = mongoose.model('categories', CategoriesSchema);