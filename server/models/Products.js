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
    // Category: {
    //     type: Object,
    //     required: false
    // },
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