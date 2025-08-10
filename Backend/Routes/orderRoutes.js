import express from 'express'
import { allOrders, placeOrdercod, placeOrderrazor, placeOrderstripe, updateStatus, userOrders, verifyStripe } from '../Controllers/orderController.js'
import adminAuth from '../Middleware/adminAuth.js'
import AuthUser from '../Middleware/Auth.js'
const orderRouter = express.Router()
//Admin only routers
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/update',adminAuth,updateStatus)

//order Placing
orderRouter.post('/cod',AuthUser,placeOrdercod)
orderRouter.post('/stripe',AuthUser,placeOrderstripe)
orderRouter.post('/razorpay',AuthUser,placeOrderrazor)

//User realted features
orderRouter.post('/userOrders',AuthUser,userOrders)

// Verify payment
orderRouter.post('/verifystripe',AuthUser,verifyStripe)
export default orderRouter