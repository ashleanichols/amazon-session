// const fs = require('fs');
// const path = require('path');
// const dbFile = path.join(__dirname, '../data/db.json');

// const getProducts = (cb) => {
//     fs.readFile(dbFile, (err, data) => {
//         // if error - file is not exist.
//         if (err) {
//             cb([]);
//         }
//         // return the products array data
//         cb(JSON.parse(data));
//     });
// };

// module.exports = class Product {
//     constructor(id, imageUrl, title, desc, price) {
//         this.id = id;
//         this.imageUrl = imageUrl;
//         this.title = title;
//         this.desc = desc;
//         this.price = price;
//     }

//     save() {
//         getProducts((products) => {
//             if (this.id) {
//                 const productIndex = products.findIndex((p) => p.id == this.id);
//                 const updatedProducts = [...products];
//                 updatedProducts[productIndex] = this;
//                 fs.writeFile(dbFile, JSON.stringify(updatedProducts), (err) =>
//                     console.log(err)
//                 );
//             } else {
//                 this.id = Date.now();
//                 products.push(this);
//                 fs.writeFile(dbFile, JSON.stringify(products), (err) =>
//                     console.log(err)
//                 );
//             }
//         });

//     }

//     static fetchProducts(cb) {
//         getProducts(cb);
//     }

//     static findById(id, cb) {
//         getProducts((products) => {
//             const product = products.find((p) => p.id == id);
//             cb(product);
//         })
//     }

//     static deleteById(id) {
//         getProducts((products) => {
//             const updatedProducts = products.filter(p => p.id != id);
//             fs.writeFile(dbFile, JSON.stringify(updatedProducts), (err) =>
//                 console.log(err)
//             );
//         })
//     }
// };

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

module.exports = mongoose.model('Product', productSchema);