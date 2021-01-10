const mongoose = require('mongoose')

const ProductsSchema = mongoose.Schema({
    Active: {
        type: Boolean,
        require: false
    },
    Name: {
        type: String,
        require: false
    },
    Price: {
        type: String,
        require: false
    },
    Description: {
        type: String,
        require: false
    },
    Category: {
        type: Array,
        required: false
    },
    Home: {
        type: Boolean,
        require: false
    },
    // Colors: {
    //     type: Array,
    //     require: false
    // },
    // Stock: {
    //     type: Boolean,
    //     require: false
    // },
    // Available: {
    //     type: String,
    //     require: false
    // }
    ProductImage: {
        type: Array,
        require: true
    }
});


module.exports = Products = mongoose.model('products', ProductsSchema);