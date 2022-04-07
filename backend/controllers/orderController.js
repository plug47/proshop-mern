import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'

//@description      Create new order
//@route            POST api/orders
//@access           Private
const AddOrderItems = asyncHandler(async(req, res) => {

    console.log('This is orderController')
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

    if(orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
    } else {
        const order = new Order({
            orderItems, 
            user: req.user._id,
            shippingAddress, 
            paymentMethod, 
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice
        })

        const createdOrder = await order.save()

        res.status(201).json(createdOrder)
    }
})

export {AddOrderItems}