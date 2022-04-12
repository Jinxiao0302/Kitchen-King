const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn } = require('../middleware');

const ExpressError = require('../utils/ExpressError');
const Receipe = require('../models/receipe');


router.get('/search',catchAsync(async (req, res) => {
    const {q} = req.query;
    if (!q) {
        req.flash('error', 'Cannot find that receipe!');
        return res.redirect('/receipes');
    }
    const receipes = await Receipe.find({name:{$regex:q}});
    if (receipes.length <= 0){
        req.flash('error', 'Cannot find that receipe!');
        return res.redirect('/receipes');
    }
    res.render('receipes/index', { receipes });
}))

router.get('/', catchAsync(async (req, res) => {
    const receipes = await Receipe.find({});
    res.render('receipes/index', { receipes })
}));

router.get('/new', isLoggedIn, (req, res) => {
    res.render('receipes/new');
})

router.post('/', isLoggedIn, catchAsync(async (req, res, next) => {
    const receipe = new Receipe(req.body.receipe);
    await receipe.save();
    req.flash('success', 'Successfully made a new receipe!');
    res.redirect(`/receipes/${receipe._id}`)
}))

router.get('/:id', catchAsync(async (req, res,) => {
    const receipe = await Receipe.findById(req.params.id).populate('reviews');
    if (!receipe) {
        req.flash('error', 'Cannot find that receipe!');
        return res.redirect('/receipes');
    }
    res.render('receipes/show', { receipe });
}));

router.get('/:id/edit', isLoggedIn, catchAsync(async (req, res) => {
    const receipe = await Receipe.findById(req.params.id)
    if (!receipe) {
        req.flash('error', 'Cannot find that receipe!');
        return res.redirect('/receipes');
    }
    res.render('receipes/edit', { receipe });
}))

router.put('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    const receipe = await Receipe.findByIdAndUpdate(id, { ...req.body.receipe });
    req.flash('success', 'Successfully updated the receipe!');
    res.redirect(`/receipes/${receipe._id}`)
}));

router.delete('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Receipe.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted the receipe')
    res.redirect('/receipes');
}));



module.exports = router;