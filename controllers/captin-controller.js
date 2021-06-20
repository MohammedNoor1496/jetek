const Captin = require("../models/Captin");
var jwt = require("jsonwebtoken");
const Order = require("../models/Order");

const io = require("../socket");
const User = require("../models/User");
const Sessions = require("../models/sessions");

// this api is for captin register user mobile app isDriver
const createCaptin = async (req, res) => {
  console.log("create Captin function ");

  var str = req.get("Authorization");
  if (!str) {
    return res.status(401).json({ msg: "access denied no token provided" });
  }
  const payload = jwt.verify(str, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
  });
  // console.log(payload.id);
  const user = await User.findOne({ phone: payload.phone });
  if (!user) {
    return res.status(401).json({ msg: "Bad Token" });
  } else {
    let userId = user._id;

    const UpdateAccount = async () => {
      await User.findByIdAndUpdate(userId, {
        $set: { isDriver: true },
      });
    };
    UpdateAccount();
  }

  const drivingLicensefileName = req.files["drivingLicense"][0].filename;
  // console.log(drivingLicensefileName);
  const vehicleLicensefileName = req.files["vehicleLicense"][0].filename;
  // console.log(vehicleLicensefileName);
  const frontOfvehiclefileName = req.files["frontOfvehicle"][0].filename;
  // console.log(frontOfvehiclefileName);
  const backOfvehiclefileName = req.files["backOfvehicle"][0].filename;
  // console.log(backOfvehiclefileName);
  const leftSideOfvehiclefileName = req.files["leftSideOfvehicle"][0].filename;
  // console.log(leftSideOfvehiclefileName);
  const rightSideOfvehiclefileName =
    req.files["rightSideOfvehicle"][0].filename;
  // console.log(rightSideOfvehiclefileName);
  const photofileName = req.files["photo"][0].filename;
  // console.log(photofileName);
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
      photo: `${basePath}${photofileName}`,
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
      .then(async () => {
        return res.status(201).json({ msg: "Captin Successfully Registered" });
        console.log("Captin registered");
      });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ msg: error });
  }
};

const acceptAnOrder = async (req, res) => {
  console.log("acceptAnOrder");
  console.log(req.body);
  const { price, order_id } = req.body;

  var str = req.get("Authorization");

    const payload = jwt.verify(str, process.env.ACCESS_TOKEN_SECRET, {
      algorithm: "HS256",
    });
    // console.log(payload.id);
    const getUser = await Captin.findOne({ phone: payload.phone });
    if (getUser == null) {
      return res.status(400).json({msg:"you can not access bad token"})
    }
    // console.log(getUser.phone);
    // console.log(getUser);
    if (getUser) {
      const data = await Order.findOne({ _id: order_id }).select({
        user_Phone: 1,
      });
      // console.log(data);
      // console.log("user phone");
      console.log(data.user_Phone);
      const phone = data.user_Phone;
      const sessiondata = await Sessions.findOne({ userPhone: phone });
      console.log("session data" + sessiondata);
      const socket_id = sessiondata.userSocketIo;

      console.log("from captin io");
      // console.log(user_socket_id);
      if (socket_id !== null) {
        // console.log(socket_id );
        console.log("acceptAnOrder user socket id " + socket_id);

        io.getIO().of("/users").to(socket_id).emit("captinoffer", {
          price: price,
          captin_phone: getUser.phone,
          order_id: order_id,
        });
        return res.status(200).json({ msg: "your offer has been sent  " });
      } else {
        console.log("user socket id not found ");
        return res.status(400).json({ msg: "the user is not connected" });

      }
    } else {
      return res.status(400).json({ msg: "you can't access " });
    }
 
    res.status(401).json({ msg: "Bad Token" });
  
};

const deleteCaptinForTesting = async (req, res) => {
  console.log("deleteCaptinForTesting");

  try {
    const deleteUser = await Captin.deleteOne({ phone: req.body.phone });
    if (deleteUser) {
      res.status(200).json({ msg: "user deleted enjoy testing " });
    } else {
      res.status(400).send({ status: false });
    }
  } catch {
    res.status(401).json({ msg: "error" });
  }
};

const getOldCaptinOrders = async (req, res) => {
  console.log("getOldCaptinOrders");
  var str = req.get("Authorization");
  try {
    const payload = jwt.verify(str, process.env.ACCESS_TOKEN_SECRET, {
      algorithm: "HS256",
    });
    // console.log(payload.id);
    const getUser = await Captin.findOne({ phone: payload.phone });
    console.log(getUser.phone);
    // console.log(getUser);
    if (getUser) {
      const orders = await Order.find({ captin_phone: getUser.phone }).populate(
        "sell_point_id"
      ).limit(10);
      // console.log(orders);
      if (orders.length == 0) {
        return res.status(404).json({ msg: "you don't have any old orders" });
      } else if (orders.length > 0) {
        return res.status(200).json(orders);
      }
    } else {
      return res.status(400).json({ msg: "you can't access " });
    }
  } catch {
    res.status(401).json({ msg: "Bad Token" });
  }
};

const getNotAcceptedOrders = async (req, res) => {
  console.log("getNotAcceptedOrders");
  var str = req.get("Authorization");

  const payload = jwt.verify(str, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
  });
  // console.log(payload.id);
  const getUser = await Captin.findOne({ phone: payload.phone });
  if (getUser !== null) {
    const orders = await Order.find({ status: 1 }).populate("sell_point_id");
    // console.log(orders);
    if (orders.length == 0) {
      return res.status(404).json({ msg: "you don't have any new orders" });
    } else if (orders.length > 0) {
      return res.status(200).json(orders);
    }
  } else {
    return res.status(400).json({ msg: "you can't access " });
  }
};

const getUserInfo = async (req, res) => {
  console.log("getCaptinInfo");
  console.log(req.body);
  var str = req.get("Authorization");
  const { user_phone } = req.body;

  const payload = jwt.verify(str, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
  });
  // console.log(payload.id);
  const getUser = await Captin.findOne({ phone: payload.phone });
  if (!getUser) {
    return res.status(400).json({ msg: "you can't access captin not found" });
  }

  const catptinData = await User.findOne({ phone: user_phone });

  if (catptinData !== null) {
    return res.status(200).json(catptinData);
  } else {
    return res.status(400).json({ msg: "user not found " });
  }
};


const updateCaptinLocation = async (req,res) =>{
  console.log("updateCaptinLocation");
  console.log(req.body);
  var str = req.get("Authorization");
  const {lat , lng } = req.body;

  const payload = jwt.verify(str, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
  });
  const getUser = await Captin.findOne({ phone: payload.phone });
  if (!getUser) {
    return res.status(400).json({ msg: "you can't access captin not found" });
  }

 
    const update =  await Captin.findByIdAndUpdate(getUser._id, {
      $set: { lat: lat , lng :lng },
    }).then(
      ()=>{
        return res.status(200).json({msg:"location updated"});

      }
    ).catch(
      (err)=>{
        console.log(err );
        return res.status(400).json({msg:"location is not  updated"});

      }
    )
    
}

const updateOrderState = async (req,res) =>{
  console.log("updateOrderState");
  console.log(req.body);
  var str = req.get("Authorization");
  const {state , order_id } = req.body;

  const payload = jwt.verify(str, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
  });
  const getUser = await Captin.findOne({ phone: payload.phone });
  if (!getUser) {
    return res.status(400).json({ msg: "you can't access captin not found" });
  }

 
    const update =  await Order.findByIdAndUpdate(order_id, {
      $set: { status: state},
    }).then(
      async()=>{
        const data = await Order.findOne({ _id: order_id }).select({
          user_Phone: 1,
        });
        // console.log(data);
        // console.log("user phone");
        console.log(data.user_Phone);
        const phone = data.user_Phone;

        const sessiondata = await Sessions.findOne({ userPhone: phone });
        if (sessiondata !== null) {
          const socket_id = sessiondata.userSocketIo;
          console.log("session data" + sessiondata);
        
        
  
        console.log("from captin io");
        // console.log(user_socket_id);
          // console.log(socket_id );
          console.log("acceptAnOrder user socket id " + socket_id);
  
          io.getIO().of("/users").to(socket_id).emit("statuschange", {
           status:state,
            order_id: order_id,
          });
      }
      return res.status(200).json({msg:"order updated"});

    }
    ).catch(
      (err)=>{
        console.log(err );
        return res.status(400).json({msg:"order is not  updated"});

      }
    )
    
}
module.exports = {
  createCaptin,
  acceptAnOrder,
  deleteCaptinForTesting,
  getOldCaptinOrders,
  getNotAcceptedOrders,
  getUserInfo,
  updateCaptinLocation,
  updateOrderState
};
