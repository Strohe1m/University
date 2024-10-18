const express = require('express');
const router = express.Router();
const Article = require('../models/article');

// Получение всех статей
router.get('/', async (req, res) => {
    const articles = await Article.find();
    res.render('articles/index', { articles: articles });
});

// Страница создания статьи
router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() });
});

// Создание новой статьи
router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description
    });

    try {
        article = await article.save();
        res.redirect(`/articles/${article.id}`);
    } catch (e) {
        res.render('articles/new', { article: article });
    }
});

// Просмотр статьи по ID
router.get('/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    res.render('articles/show', { article: article });
});

// Удаление статьи
router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/articles');
});

module.exports = router;
