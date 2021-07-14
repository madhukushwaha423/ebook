const express = require('express');
const createHttpError = require('http-errors');
const router = new express.Router()
const orderModel = require('./../models/orders')

router.get('/allOrders' , async(req, res) => {
    try {
        const allorder = await orderModel.find()
        res.status(200).json({
            "Msg" : "Succesfuly fetched",
            "Orders":allorder
        })
    } catch (error) {
        res.status(400).json({
            "Error":error
        })
    }
})


router.get("/GetOrderById/:_id", async (req, res) => {
    try {
      const allOrder = await orderModel.findOne({ _id: req.params._id });
      res.json({
        success: true,
        msg: "Successful",
        data: allOrder,
      });
    } catch (error) {
      res.json({
        success: false,
        msg: "Failed",
        error: error.message,
      });
    }
  });


  router.get("/user/:userId/order", async (req, res) => {
    try {
      const order_list = await orderModel
        .find({ _userid: req.params.userId })
  
      if (order_list.length == 0) {
        res.status(200).json({
          success: true,
          msg: "No order Placed Yet..",
        });
      } else {
        res.status(200).json({
          success: true,
          msg: "Successfull",
          data: order_list,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: "Server Error",
        error: error.message,
      });
    }
  });


  //--------------Add single order-------------------//
// totalamount[l]
router.post("/user/:userId/order", async (req, res) => {
   try{
       
       const newOrder = new orderModel({
        userid:req.body.userid,
        bookid:req.body.bookid,
        country:req.body.country,
        pincode:req.body.pincode,
        state:req.body.state,
        city:req.body.city,
        total_price:req.body.totalPrice,
        phoneNumber:req.body.phoneNumber
       });
       console.log(req.body);

       const savedOrder = await newOrder.save();
       console.log(savedOrder);

       if(!savedOrder){
           res.status(500).json({
               msg : " Can not saved order",
               error : error
           })
       }
       else {
           res.status(201).json({
               msg : "Suceesfully saved order",
               orderDetails : savedOrder
           })
       }
   }
    catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        msg: "Internal Server Error",
        error: error.message,
      });
    }
  });
  


module.exports = router