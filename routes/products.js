const express = require('express');
const path = require('path');
const router = express.Router();
const productCtrl = require('../controllers/productCtrl');


router.get('/', productCtrl.getProducts);
router.get('/products/:id', productCtrl.getProduct);
router.get('/cart', productCtrl.getCart);
router.post('/cart', productCtrl.postCart);
router.post('/cart-delete', productCtrl.postDeleteCart);
router.post('/orders', productCtrl.postOrder);
router.get('/orders', productCtrl.getOrder);


module.exports = router;