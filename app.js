const express = require('express');
const path = require('path');
const app = express();
const expressHbs = require('express-handlebars');
const adminRutes = require('./routes/admin');
const productsRoutes = require('./routes/products');
const authRoutes = require('./routes/auth')
const errorCtrl = require('./controllers/errorCtrl');
const mongoose = require('mongoose');
const User = require('./models/user');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const dbUrl = 'mongodb+srv://alfred:alfred00@cluster0.2ct9x.mongodb.net/amazon';
const store = new MongoDBStore({
    uri: dbUrl,
    collection: 'sessions',

});

app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {

    User.findById('6050742657582b60ece38ab4')
        .then(user => {
            req.user = user;
            next();
        }).catch(err => console.log(err));

});
// configure Handlebars 
app.engine('hbs', expressHbs({
    extname: '.hbs',
    defaultLayout: 'main-layout',
    layoutsDir: 'views/layouts',
    partialsDir: 'views/partials',
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true
    }
}));

// Seletc hanldebars as view engine 
app.set('view engine', 'hbs')
app.use('/admin', adminRutes);
app.use('/', productsRoutes);
app.use(authRoutes);

app.use(errorCtrl.get404);


mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {

        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: "john",
                    email: 'test@test.com',
                    cart: {
                        products: []
                    }
                })
                user.save();
            }
        })

        console.log('Connected to DB');
        app.listen(8080);
    }).catch(err => console.log(err));
