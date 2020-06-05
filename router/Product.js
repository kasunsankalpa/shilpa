const express = require('express');
const router = express.Router();
const product = require('../controller/Product/Product');


router.post("/getProduct", product.getProduct);
router.post("/productbyId",product.getProductby_productId)
router.post("/GetProducttype",product.GetProductType)


module.exports = router;