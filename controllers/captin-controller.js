const Captin = require('../models/Captin');
var jwt = require('jsonwebtoken');
const Session = require('../models/sessions');
const Order = require('../models/Order');

// this api is for captin register user mobile app 
const createCaptin = async (req, res) => {
    console.log("create Captin function ");
    console.log(req.body);

    const { firstName, lastName, phone, identity, balance, photo, birthday, lat, lng } = req.body;
    console.log(firstName);
    let testUserPhone = await Captin.findOne({ phone: req.body.phone });
    if (testUserPhone) return res.status(400).send('captin phone already exists ');
    let testUserIdentity = await Captin.findOne({ phone: req.body.identity });
    if (testUserIdentity) return res.status(400).send('captin identity already exists ');
    // create the sms code for the conformation 
    var val = Math.floor(1000 + Math.random() * 9000);
    console.log(val);
    today = new Date();
    today.setHours(0, 0, 0, 0);
    try {
        const captin = await new Captin(
            {
                firstName,
                lastName,
                phone,
                balance,
                photo,
                birthday,
                identity,
                lat,
                lng,
                sentOtp: val,
                sortDate: today
            }
        ).save()
            .then(() => {
                console.log("Captin registered");
                return res.status(201).json({ msg: "Captin Successfully Registered" });
                // handle OTP /////////////////////
                // sendSmsCode(phone);
            })

    } catch (error) {
        console.log(error);
        return res.status(403).json({ msg: err });
    }
};

const acceptAnOrder = async (req,res) =>{
    console.log("acceptAnOrder");;

    const { driver_phone, price, order_id } = req.body;

    const acceptOrder = await Prouduct.findByIdAndUpdate({ id: order_id }, {
        $set: {
           captin_phone:driver_phone,
            price, 
        }
    });
    if (acceptOrder) {
        res.status(200).json({ msg:"Order Accepted" })
        const user_Phone = Order.findOne({ 'id': order_id }, {user_Phone :1})

        const user_socket_id = session.findOne({ 'userPohne': user_Phone }, {userSocketIo:1})
    } else {
        res.status(400).send({ "status": false })

    }
}


module.exports = {
    createCaptin,
    acceptAnOrder
}