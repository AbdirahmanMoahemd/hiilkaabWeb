import asyncHandler from "express-async-handler";
import DeliveryOrders from "../models/deliveryorders.js";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";

// @desc    Fetch all categories
// @route   POST /api/categorie/
// @access  Public
export const getDeliveryOrders = asyncHandler(async (req, res) => {
  const deliveryOrders = await DeliveryOrders.find();

  if (deliveryOrders) {
    res.status(200).json({ deliveryOrders });
  }
  
});


// @desc    Fetch all categories
// @route   POST /api/categorie/
// @access  Public
export const getDeliveryOrders2 = asyncHandler(async (req, res) => {
    const deliveryOrders = await DeliveryOrders.find();
  
    if (deliveryOrders) {
        res.status(200).json(deliveryOrders);
    }
   
  });

// @desc    Fetch category by id
// @route   POST /api/categorie/:id
// @access  Public
export const getDeliveryOrdersById = asyncHandler(async (req, res) => {
  const deliveryOrders = await DeliveryOrders.findById(req.params.id);

  if (deliveryOrders) {
    res.json(deliveryOrders);
  } else {
    res.status(404);
    throw new Error("deliveryOrder Not Found");
  }
});

// @desc    create category
// @route   POST /api/categorie/:id
// @access  Private/Admin
export const createDeliveryOrders = asyncHandler(async (req, res) => {
  let deliveryOrder = new DeliveryOrders({
    senderName: req.body.senderName,
    senderPhone: req.body.senderPhone,
    recipientName: req.body.recipientName,
    recipientPhone: req.body.recipientPhone,
    itemType: req.body.itemType,
    price: req.body.price,
    orderedAt: new Date().getTime(),
    isDelivered: req.body.isDelivered,
  });
  deliveryOrder = await deliveryOrder.save();

  if (!deliveryOrder) {
    return res.status(400).json({error:"the deliveryOrder cannot be created!"});
  } else{
    const config = {
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    };

    let transporter = nodemailer.createTransport(config);

    var mailGenerator = new Mailgen({
      theme: "default",
      product: {
        // Appears in header & footer of e-mails
        name: "Mailgen",
        link: "https://mailgen.js/",
        // Optional product logo
        // logo: 'https://mailgen.js/img/logo.png'
      },
    });

    var email = {
      body: {
        name: "HIILKAAB",
        intro: "NEW DELIVERY ORDER",
        table: {
          data: [
            {
              SenderName: req.body.senderName,
              SenderPhone: req.body.senderPhone,
              RecipientName: req.body.recipientName,
              RecipientPhone:req.body.recipientPhone,
              ItemType:req.body.itemType,
            },
          ],
        },
        action: {
          instructions: 'To get full details, please click here:',
          button: {
              color: '#22BC66', // Optional action button color
              text: 'See the delivery order',
              link: `https://hiilkaab.com/order/${deliveryOrder._id}`
          }
      },

        outro: "MAHADSANID",
      },
    };

    var emailBody = mailGenerator.generate(email);

    let message = {
      from: process.env.EMAIL,
      to: "fariidka06@gmail.com",
      subject: "NEW DELIVERY ORDER",
      html: emailBody,
    };

    transporter.sendMail(message);

    res.json(deliveryOrder);
  }

  
});
