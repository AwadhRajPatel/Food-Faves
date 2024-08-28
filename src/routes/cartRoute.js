const express = require('express');
const { getCartByUser, modifyProductToCart, clearCartbyId, } = require('../controllers/cartController');
const { isLoggedIn } = require('../validation/authValidator');

const cartRouter = express.Router();


cartRouter.get('/',isLoggedIn, getCartByUser);

cartRouter.post('/:operation/:productId', isLoggedIn, modifyProductToCart)

cartRouter.delete('/products',isLoggedIn,clearCartbyId);

module.exports = cartRouter;