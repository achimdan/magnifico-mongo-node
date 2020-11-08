const express = require('express');
const router = express.Router();
const Products = require('../../models/Products')

//Get products
router.get('/', async (req, res) => {
    try {
        const products = await Products.find();
        res.json(products);
    } catch(err){
        console.log(err);
    }
});

//Post products
router.post('/', async (req, res) => {
    const productModel = req.body
    const product =  new Products(productModel);
    
    try {
        const savedProducts = await product.save();
        res.json(savedProducts);
    } catch(err) {
        res.json(err);
    }
});

//Update product
router.patch('/:productId', async (req, res) => {
    const id = req.params.productId
    const productModel = req.body

    try {
        const updateProduct = await Products.findOneAndUpdate(
            id,
            productModel
        );
        res.json(updateProduct);
    } catch(err) {
        res.json(err);
    }
});

//Get specific product
router.get('/:productId', async (req, res) => {
    try {
        const product = await Products.findById(req.params.productId);
        res.json(product);
    } catch(err){
        console.log(err);
    }
});

//Delete product
router.delete('/:productId', async (req, res) => {
    try {
        const removeProduct = await Products.deleteOne({ _id: req.params.productId });
        res.json(removeProduct);
    } catch(err){
        console.log(err);
    }
});

module.exports = router;