const mongoose = require('mongoose');
const User = require('./user')
const Book = require('./book')

const orderSchema = mongoose.Schema({
    phoneNumber: {
        type: String
    },
    userid: {
        type: String,
        ref: User,
        // required:true
    },
    bookid: {
        type: String,
        ref: Book,
        // required:true
    },
    status: {
        type: String,
        default: "pending"
    },
    pincode: {
        type: String
    },
    pincode: {
        type: String,
        default: 'india',
        lowercase: true
    },
    state: {
        type: String,
        lowercase: true
    },
    city: {
        type: String,
        lowercase: true
    },
    /* completed means deleverd or cancaled we are done with order */
    completed: {
        type: Boolean,
        default: false
    },
    order_Date: {
        type: Date,
        default: new Date()
    },
    Update_date: {
        type: Date,
        default: new Date()
    },
    total_price: {
        type: Number,
        default: 1
    },

    created_at: {
        type: String,
        default: new Date()
    }
})


const order = mongoose.model('order', orderSchema);
module.exports = order;


