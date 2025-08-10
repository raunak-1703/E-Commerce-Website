import express from 'express'
import { addToCart, deleteFromCart, getUserCart, updateCart } from '../Controllers/cartController.js'
import AuthUser from '../Middleware/Auth.js'
const CartRouter = express.Router()
CartRouter.post('/get',AuthUser,getUserCart)
CartRouter.post('/add',AuthUser,addToCart)
CartRouter.post('/update',AuthUser,updateCart)
CartRouter.post('/delete',AuthUser,deleteFromCart)
export default CartRouter