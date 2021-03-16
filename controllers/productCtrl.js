const Product = require('../models/product');
const Order = require('../models/Order');



exports.getProducts = (req, res, next) => {

    Product.find().then(products => {
        res.render('products/index', {
            docTitle: "Home Page",
            productsActive: true,
            products: products,
            hasProducts: products.length > 0
        });
    }).catch(err => console.log(err))

}

exports.getProduct = (req, res, next) => {
    const id = req.params.id;
    Product.findById(id).then(product => {
        res.render('products/product-details', {
            product: product,
            docTitle: 'Amazon.com '
        });
    });

}

exports.getCart = (req, res, next) => {
    req.user.populate('cart.products.productId')
        .execPopulate()
        .then(user => {
            res.render('products/cart', {
                docTitle: 'Cart Page',
                activeCart: true,
                products: user.cart.products,
                hasProducts: user.cart.products.length > 0
            })
        })

}

exports.postCart = (req, res, next) => {
    let id = req.body.id;
    Product.findById(id)
        .then(product => {
            return req.user.addToCart(product);
        }).then(() => {
            res.redirect(req.body.path);
        })
}

exports.postDeleteCart = (req, res, next) => {


    const id = req.body.id;
    req.user.removeFromCart(id).then(result => {
        res.redirect(req.body.path);
    }).catch(err => console.log(err));
}

exports.postOrder = (req, res, next) => {

    req.user.populate('cart.products.productId')
        .execPopulate()
        .then(user => {

            console.log(user.cart.products);
            const products = user.cart.products.map(p => {
                return {
                    qty: p.qty,
                    product: {...p.productId._doc }
                };
            });

            const order = new Order({
                user: { name: req.user.name, userId: req.user },
                products: products
            });
            return order.save();
        }).then(result => {
            return req.user.clearCart()
        }).then(result => {
            res.redirect('/orders');
        }).catch(err => console.log(err));
}

exports.getOrder = (req, res, next) => {
    Order.find({ "user.userId": req.user._id }).then(orders => {
        console.log(orders.products);
        res.render('products/orders', {
            activeOrders: true,
            docTitle: 'Orders',
            orders: orders
        })
    })
}