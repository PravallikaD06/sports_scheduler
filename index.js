const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const flash = require('connect-flash');
const path = require('path');
const pool = require('./database'); 
const routes = require('./routes'); 
dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(express.static(path.join(__dirname, '../public'))); 
app.use(methodOverride('_method'));

app.use(
    session({
        secret: process.env.SESSION_SECRET || 'secret',
        resave: false,
        saveUninitialized: false,
    })
);

app.use(flash());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../public')); 
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.get('/', (req, res) => {
    res.render('home'); 
});

app.use('/', routes);
const PORT = process.env.PORT || 3478;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
