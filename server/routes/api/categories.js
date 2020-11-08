const express = require('express');
const router = express.Router();
const Categories = require('../../models/Categories')

//Get categories
router.get('/', async (req, res) => {
    try {
        const categories = await Categories.find();
        res.json(categories);
    } catch(err){
        console.log(err);
    }
});

//Post categories
router.post('/', async (req, res) => {
    const categories =  new Categories({
        Name: req.body.Name,
        Description: req.body.Description
    });
    
    try {
        const savedCategories = await categories.save();
        res.json(savedCategories);
    } catch(err) {
        res.json(err);
    }
});

//Get specific category
router.get('/:categoryId', async (req, res) => {
    try {
        const category = await Categories.findById(req.params.categoryId);
        res.json(category);
    } catch(err){
        console.log(err);
    }
});

//Delete category
router.delete('/:categoryId', async (req, res) => {
    try {
        const removeCategory = await Categories.deleteOne({ _id: req.params.categoryId });
        res.json(removeCategory);
    } catch(err){
        console.log(err);
    }
});

//Update category
router.patch('/:categoryId', async (req, res) => {
    try {
        const updateCategory = await Categories.updateOne(
            { _id: req.params,categoryId },
            { $set: { Name: req.body.Name, Description: req.body.Description } }
        );
        res.json(updateCategory);
    } catch(err) {
        res.json(err);
    }
});

module.exports = router;