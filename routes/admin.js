const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/adminCtrl');

router.get('/add-product', adminCtrl.getAddProduct);
router.post('/add-product', adminCtrl.postAddProduct);
router.get('/products', adminCtrl.getProducts);
router.post('/delete-product', adminCtrl.postDeleteProduct);
router.get('/edit-product/:id', adminCtrl.getEditProduct);
router.post('/edit-product', adminCtrl.postEditProduct)
module.exports = router;