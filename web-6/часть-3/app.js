const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');

const app = express();

mongoose.connect('mongodb://localhost/articlesDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use('/articles', articleRouter);

app.listen(3000, () => {
    console.log('The server is running on port 3000');
});
