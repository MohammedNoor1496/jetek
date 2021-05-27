const Captin = require("../models/Captin");
var jwt = require("jsonwebtoken");
const session = require("../models/sessions");
const Order = require("../models/Order");

var io = require("../socket");

// this api is for captin register user mobile app
const createCaptin = async (req, res) => {
  console.log("create Captin function ");
  console.log(req.files['drivingLicense'][0]);
  console.log(req.files['vehicleLicense'][0]);
  const drivingLicensefileName = req.files['drivingLicense'][0].filename;
  const vehicleLicensefileName = req.files['vehicleLicense'][0].filename;
  const frontOfvehiclefileName = req.files['frontOfvehicle'][0].filename;
  const backOfvehiclefileName = req.files['backOfvehicle'][0].filename;
  const leftSideOfvehiclefileName = req.files['leftSideOfvehicle'][0].filename;
  const rightSideOfvehiclefileName =req.files['rightSideOfvehicle'][0].filename;
  const photofileName =req.files['photo'][0].filename;

  const basePath = `/public/uploads/`;

  const {
    fullName,
    phone,
    identity,
    birthday,
    lat,
    lng,
    plateNumber,
    email,
    address,
    vehicleType,
    vehicleYear,
    bankIban,
  } = req.body;
  let testUserPhone = await Captin.findOne({ phone: req.body.phone });
  if (testUserPhone)
    return res.status(400).send("captin phone already exists ");
  let testUserIdentity = await Captin.findOne({ phone: req.body.identity });
  if (testUserIdentity)
    return res.status(400).send("captin identity already exists ");
  
  today = new Date();
  today.setHours(0, 0, 0, 0);
  try {
    const captin = await new Captin({
      fullName,
      phone,
      identity,
      photo :`${basePath} ${photofileName}`,
      drivingLicense: `${basePath}${drivingLicensefileName}`,
      vehicleLicense: `${basePath}${vehicleLicensefileName}`,
      frontOfvehicle: `${basePath}${frontOfvehiclefileName}`,
      backOfvehicle: `${basePath}${backOfvehiclefileName}`,
      leftSideOfvehicle: `${basePath}${leftSideOfvehiclefileName}`,
      rightSideOfvehicle: `${basePath}${rightSideOfvehiclefileName}`,
      birthday,
      lat,
      lng,
      plateNumber,
      email,
      address,
      vehicleType,
      vehicleYear,
      bankIban,
      sortDate: today,
    })
      .save()
      .then(() => {
        console.log("Captin registered");
        return res.status(201).json({ msg: "Captin Successfully Registered" });
        // handle OTP /////////////////////
        // sendSmsCode(phone);
      });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ msg: err });
  }
};

const acceptAnOrder = async (req, res) => {
  console.log("acceptAnOrder");

  const { driver_phone, price, order_id } = req.body;

  const acceptOrder = await Prouduct.findByIdAndUpdate(
    { id: order_id },
    {
      $set: {
        captin_phone: driver_phone,
        price,
      },
    }
  );
  if (acceptOrder) {
    res.status(200).json({ msg: "Order Accepted" });
    const user_Phone = Order.findOne({ id: order_id }, { user_Phone: 1 });

    const user_socket_id = session.findOne(
      { userPohne: user_Phone },
      { userSocketIo: 1 }
    );

    io.getIO().to(user_socket_id).emit("captinOffer", {
      price: price,
      captin_phone: captin_phone,
    });
  } else {
    res.status(400).send({ msg: "order not accepted" });
  }
};

module.exports = {
  createCaptin,
  acceptAnOrder,
};
