const Captin = require("../models/Captin");
var jwt = require("jsonwebtoken");
const Order = require("../models/Order");
const ConformOrderFinish = require("../models/ConformOrderFinish");
const io = require("../socket");
const User = require("../models/User");
const Sessions = require("../models/sessions");
const Messages = require("../models/Messages");
const httpRequest = require("https");

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
    return res.status(400).json({ msg: "you can not access bad token" })
  }
  if (getUser.balance < 0) {
    return res.status(400).json({ msg: "you don't have enough balance to present an offer" })
  }

  // console.log(getUser.phone);
  // console.log(getUser);

  console.log(getUser.balance);

  if (getUser) {
    if (getUser.balance <= 0) {
      return res.status(400).json({ msg: "you don't have balance to accept any order" })
    }
    const data = await Order.findOne({ _id: order_id }).select({
      user_Phone: 1,
    });

    if (!data) {
      return res.status(400).json({ msg: "order not found" })
    }
    // console.log(data);
    // console.log("user phone");
    console.log(data.user_Phone);
    const phone = data.user_Phone;
    const sessiondata = await Sessions.findOne({ userPhone: phone }).sort({ 'createdAt': -1 }).limit(1);

    if (sessiondata == null) {
      return res.status(400).json({ msg: "the user is not connected" });
    }
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
      ).limit(req.body.limit);
      console.log(orders.length);
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


const updateCaptinLocation = async (req, res) => {
  console.log("updateCaptinLocation");
  console.log(req.body);
  var str = req.get("Authorization");
  const { lat, lng } = req.body;

  const payload = jwt.verify(str, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
  });
  const getUser = await Captin.findOne({ phone: payload.phone });
  if (!getUser) {
    return res.status(400).json({ msg: "you can't access captin not found" });
  }


  const update = await Captin.findByIdAndUpdate(getUser._id, {
    $set: { lat: lat, lng: lng },
  }).then(
    () => {
      return res.status(200).json({ msg: "location updated" });

    }
  ).catch(
    (err) => {
      console.log(err);
      return res.status(400).json({ msg: "location is not  updated" });

    }
  )

}

const updateOrderState = async (req, res) => {
  console.log("updateOrderState");
  console.log(req.body);
  var str = req.get("Authorization");
  const { state, order_id } = req.body;

  const payload = jwt.verify(str, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
  });
  const getUser = await Captin.findOne({ phone: payload.phone });
  if (!getUser) {
    return res.status(400).json({ msg: "you can't access captin not found" });
  }

  const order = await Order.findById(order_id);

  if (!order) {
    return res.status(400).json({ msg: "order not found " });
  }


  if (state == 2) {
    if (order.status !== 1) {
      return res.status(400).json({ msg: "you can not change to this state " });
    }
    const update = await Order.findByIdAndUpdate(order_id, {
      $set: { status: state },
    }).then(
      async () => {
        const data = await Order.findOne({ _id: order_id }).select({
          user_Phone: 1,
        });
        // console.log(data);
        // console.log("user phone");
        console.log(data.user_Phone);
        const phone = data.user_Phone;
        const sessiondata = await Sessions.findOne({ userPhone: phone }).sort({ 'createdAt': -1 }).limit(1);
        if (sessiondata !== null) {
          const socket_id = sessiondata.userSocketIo;
          console.log("session data" + sessiondata);
          console.log("from captin io");
          // console.log(user_socket_id);
          // console.log(socket_id );
          console.log("acceptAnOrder user socket id " + socket_id);

          io.getIO().of("/users").to(socket_id).emit("changeorderstatus", {
            status: state,
            order_id: order_id,
          });
        }
        return res.status(200).json({ msg: "order updated" });

      }
    ).catch(
      (err) => {
        console.log(err);
        return res.status(400).json({ msg: "order is not  updated" });
      }
    )
  } else if (state == 3) {
    if (order.status !== 2) {
      return res.status(400).json({ msg: "you can not change to this state " });
    }
    const update = await Order.findByIdAndUpdate(order_id, {
      $set: { status: state },
    }).then(
      async () => {
        const data = await Order.findOne({ _id: order_id }).select({
          user_Phone: 1,
        });
        // console.log(data);
        // console.log("user phone");
        console.log(data.user_Phone);
        const phone = data.user_Phone;
        const sessiondata = await Sessions.findOne({ userPhone: phone }).sort({ 'createdAt': -1 }).limit(1);
        if (sessiondata !== null) {
          const socket_id = sessiondata.userSocketIo;
          console.log("session data" + sessiondata);
          console.log("from captin io");
          // console.log(user_socket_id);
          // console.log(socket_id );
          console.log("acceptAnOrder user socket id " + socket_id);

          io.getIO().of("/users").to(socket_id).emit("changeorderstatus", {
            status: state,
            order_id: order_id,
          });
        }
        return res.status(200).json({ msg: "order updated" });

      }
    ).catch(
      (err) => {
        console.log(err);
        return res.status(400).json({ msg: "order is not  updated" });
      }
    )
  } else if (state == 4) {
    if (order.status !==3) {
      return res.status(400).json({ msg: "you can not change to this state " });
    }
    const update = await Order.findByIdAndUpdate(order_id, {
      $set: { status: state },
    }).then(
      async () => {
        const data = await Order.findOne({ _id: order_id }).select({
          user_Phone: 1,
        });
        // console.log(data);
        // console.log("user phone");
        console.log(data.user_Phone);
        const phone = data.user_Phone;
        const sessiondata = await Sessions.findOne({ userPhone: phone }).sort({ 'createdAt': -1 }).limit(1);
        if (sessiondata !== null) {
          const socket_id = sessiondata.userSocketIo;
          console.log("session data" + sessiondata);
          console.log("from captin io");
          // console.log(user_socket_id);
          // console.log(socket_id );
          console.log("acceptAnOrder user socket id " + socket_id);

          io.getIO().of("/users").to(socket_id).emit("changeorderstatus", {
            status: state,
            order_id: order_id,
          });
        }
        return res.status(200).json({ msg: "order updated" });

      }
    ).catch(
      (err) => {
        console.log(err);
        return res.status(400).json({ msg: "order is not  updated" });
      }
    )
  } else if (state == 5) {
    if (order.status !== 4) {
      return res.status(400).json({ msg: "you can not change to this state " });
    }
    var otp = Math.floor(1000 + Math.random() * 9000);
    console.log(otp);
    // console.log(order);
    const number = order.user_Phone;
    const phone = `966${number}`;
    console.log(phone);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = JSON.stringify({
      userName: process.env.SMS_USER_NAME,
      numbers: phone,
      userSender: "jetek",
      apiKey: process.env.SMS_API_KEY,
      msg: ` ?????? ???? ???????? 
      ?????????? ?????? ???????????????? ?????????????? ???????? ?????? ?????????????? ?????? ?????????? ???? ??????????   ?????????? ${otp}`,
    });

    const request = httpRequest.request(
      "https://www.msegat.com/gw/sendsms.php",
      options,
      (response) => {
        console.log("Status", response.statusCode);
        console.log("Headers", response.headers);
        let responseData = "";
        // console.log(response);
        if (res.statusCode !== 200) {
          return res.status(400).json({ msg: "some thing went wronge" });
        }
        response.on("data", (dataChunk) => {
          responseData += dataChunk;
        });
        response.on("end", () => {
          console.log("Response: ", responseData);
        });
      }
    );

    request.on("error", (error) => console.log("ERROR", error));
    const saveandsend = async () => {
      const saveOtp = await new ConformOrderFinish({
        orderId: order_id,
        sentOtp: otp,
      })
        .save()
        .then(() => {
          request.write(data);
          request.end();
        }).catch(
          (err) => {
            console.log(err);
          }
        )
    }
    saveandsend()
    const orderdata = await Order.findOne({ _id: order_id }).select({
      user_Phone: 1,
    });
    // console.log(data);
    // console.log("user phone");
    console.log(orderdata.user_Phone);
    const phoneNumber = orderdata.user_Phone;
    const sessiondata = await Sessions.findOne({ userPhone: phoneNumber }).sort({ 'createdAt': -1 }).limit(1);
    if (sessiondata !== null) {
      const socket_id = sessiondata.userSocketIo;
      console.log("session data" + sessiondata);
      console.log("from captin io");
      // console.log(user_socket_id);
      // console.log(socket_id );
      console.log("acceptAnOrder user socket id " + socket_id);

      io.getIO().of("/users").to(socket_id).emit("finishorder", {
        status: state,
        order_id: order_id,
      });
    }
    return res.status(200).json({ msg: "order updated" });
  }
}

const getOrderOldChat = async (req, res) => {
  console.log("getRecentUserOrders");
  var str = req.get("Authorization");
  console.log(req.body);


  if (!str) {
    res.status(401).json({ msg: "no token provided Token" });
  }
  const payload = jwt.verify(str, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
  });
  // console.log(payload.id);
  const getUser = await Captin.findOne({ phone: payload.phone });
  if (!getUser) {
    return res.status(400).json({ msg: "you can't access " });
  }
  console.log(getUser.phone);

  const order = await Order.findById(req.body.order_id);

  if (order.captin_phone == getUser.phone) {
    const messages = await Messages.find({ 'orderId': req.body.order_id });
    if (messages.length == 0) {
      return res.status(400).json({ msg: "you don't have any old messages  " });
    } else {
      return res.status(200).json(messages);

    }

  } else {
    return res.status(400).json({ msg: "you can't access this order messages " });
  }
}


module.exports = {
  createCaptin,
  acceptAnOrder,
  deleteCaptinForTesting,
  getOldCaptinOrders,
  getNotAcceptedOrders,
  getUserInfo,
  updateCaptinLocation,
  updateOrderState,
  getOrderOldChat
};

