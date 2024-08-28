const express = require('express');
const { isLoggedIn, isAdmin } = require('../validation/authValidator');
const { createNewOrder, getAllOrdersdByUser, getOrder, cancelOrder, changeOrderStatus } = require('../controllers/oderController');

const orderRouter = express.Router();

orderRouter.post('/',isLoggedIn,createNewOrder);
orderRouter.get('/',isLoggedIn,getAllOrdersdByUser);
orderRouter.get('/:orderId',isLoggedIn,getOrder);
orderRouter.put('/:orderId/cancel',isLoggedIn,cancelOrder);
orderRouter.put('/:orderId/status',isLoggedIn,isAdmin,changeOrderStatus);





module.exports = orderRouter;