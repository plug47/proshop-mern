import express from 'express'
import dotenv from 'dotenv'
import products from './data/products.js'
import connectDB from './config/db.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res)=> {
    res.send('API is running')
})

//Routing
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

//Error Handler
app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))