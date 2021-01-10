const express = require('express');
const router = express.Router();
const Products = require('../../models/Products');
const mongoose = require("mongoose");
const multer = require('multer');
const fs = require('fs')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './uploads'
        if(!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
}).array('ProductImage', 5);

const Product = require("../../models/Products");


//Get products
router.get('/', async (req, res) => {
    try {
        const products = await Products.find();
        res.json(products);
    } catch(err){
        console.log(err);
    }
});

// router.get("/", (req, res, next) => {
//     Product.find()
//         .select("name price _id productImage")
//         .exec()
//         .then(docs => {
//             console.log(docs)
//             const response = {
//                 count: docs.length,
//                 products: docs.map(doc => {
//                     return {
//                         Name: doc.Name,
//                         Price: doc.Price,
//                         ProductImage: doc.ProductImage,
//                         _id: doc._id,
//                         request: {
//                             type: "GET",
//                             url: "http://localhost:3000/products/" + doc._id
//                         }
//                     };
//                 })
//             };
//         //   if (docs.length >= 0) {
//         res.status(200).json(response);
//         //   } else {
//         //       res.status(404).json({
//         //           message: 'No entries found'
//         //       });
//         //   }
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json({
//             error: err
//         });
//       });
//   });

//Post products

router.post('/', function (req, res, next) {
    upload(req, res , err => {
        let imagesPath = [] 
        req.files.filter(el => {
            imagesPath.push(el.originalname)
        })
        console.log(req.files);
        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            Active: req.body.Active,
            Name: req.body.Name,
            Price: req.body.Price,
            Description: req.body.Description,
            Home: req.body.Home,
            Category: req.body.Category,
            ProductImage: imagesPath,
        });
        console.log(product);
        product
            .save()
            .then(result => {
                
                res.status(201).json({
                    message: "Created product successfully",
                    createdProduct: {
                        Active: result.Active,
                        Name: result.Name,
                        Price: result.Price,
                        Description: result.Description,
                        Category: result.Category,
                        _id: result._id,
                        request: {
                            type: 'GET',
                            url: "http://localhost:3000/products/" + result._id
                        }
                    }
                });
            })
            .catch(err => {
                    console.log(err);
                    res.status(500).json({
                    error: err
                });
            });

    })
  })

//Update product
router.put('/:productId', async (req, res) => {
    const id = req.params.productId
    const productModel = req.body
    try {
        const updateProduct = await Products.findByIdAndUpdate(id,productModel);
        console.log(updateProduct)
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