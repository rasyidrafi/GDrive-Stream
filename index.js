const express = require('express');
const path = require('path');
const app = express();
const { auth } = require('./function/init')

// View Engine Setup & Tools
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const GlobalRoutes = require('./router');
app.use('/', GlobalRoutes.root);
app.use('/search', GlobalRoutes.search);
app.use('/download', GlobalRoutes.download);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
    auth();
});