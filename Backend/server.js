import express from 'express'
import dotenv from 'dotenv'

import cors from 'cors'
import connectdb from './config/connectdb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './Routes/userRoutes.js'
import productRouter from './Routes/productsRoutes.js'
import CartRouter from './Routes/CartRoutes.js'
import orderRouter from './Routes/orderRoutes.js'

dotenv.config()

const PORT = process.env.PORT||8000
const MONGO_URI= process.env.MONGO_URI
const app = express()

app.use(cors())
app.use(express.json())

connectdb(MONGO_URI)
connectCloudinary()

app.use('/api/auth',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',CartRouter)
app.use('/api/order',orderRouter)
app.get('/',(req,res)=>{
    res.send('Server up!')
})

app.listen(PORT,()=>{
    console.log('Server up!')
})