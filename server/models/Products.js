const mongoose = require('mongoose')

const ProductsSchema = mongoose.Schema({
    Name: {
        type: String,
        require: true
    },
    Price: {
        type: Number,
        require: true
    },
    Description: {
        type: String,
        require: true
    },
    Category: {
        type: Object,
        required: true
    }
});


module.exports = Products = mongoose.model('products', ProductsSchema);