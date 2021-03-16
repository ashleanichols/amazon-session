const Product = require('../models/product');




exports.getProducts = (req, res, next) => {
    Product.find().then(products => {
        res.render('admin/list-products', {
            products,
            hasProducts: products.length > 0,
            docTitle: 'Admin Products',
            adminProductsActive: true,
        })
    }).catch(err => console.log(err));
}


exports.postAddProduct = (req, res, next) => {
    let product = new Product({
        title: req.body.title,
        price: req.body.price,
        desc: req.body.desc,
        imageUrl: req.body.imageUrl,
        userId: req.user._id
    });
    product.save().then(() => {
        res.redirect('/');
    }).catch(err => console.log(err));

}

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        docTitle: 'Add Product',
        addProductActive: true,
    });
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit_mode;
    const id = req.params.id;

    if (!editMode) {
        res.redirect('/');
    }

    Product.findById(id).then(product => {
        res.render('admin/add-product', {
            docTitle: 'Edit Product',
            editMode: editMode,
            product: product
        });
    }).catch(err => console.log(err));
}

exports.postEditProduct = (req, res, next) => {
    const id = req.body.id;

    Product.findById(id).then(product => {
        product.title = req.body.title;
        product.imageUrl = req.body.imageUrl;
        product.desc = req.body.desc;
        product.price = req.body.price;
        return product.save()

    }).then(() => {
        res.redirect('/admin/products');
    }).catch(err => console.log(err));

}

exports.postDeleteProduct = (req, res, next) => {
    const id = req.body.id;
    Product.findByIdAndDelete(id)
        .then(() => {
            return req.user.removeFromCart(id);
        }).then(() => {
            res.redirect('/admin/products');
        });
}