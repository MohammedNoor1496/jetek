const User = require("../models/User");
var jwt = require("jsonwebtoken");
const ConformAccount = require("../models/ConformAccount ");
const SpAdmin = require("../models/SpAdmin");
const spCatogarie = require("../models/SpCatogary");
const Prouduct = require("../models/Products");
var io = require("../socket");
const Order = require("../models/Order");
const Fee = require("../models/Fee");
const Sessions = require("../models/sessions");
const httpRequest = require("https");
const Captin = require("../models/Captin");
const Messages = require("../models/Messages");
const ConformOrderFinish = require("../models/ConformOrderFinish");
const schedule = require('node-schedule');
const Coupons = require("../models/Coupons");
const usedCoupons = require("../models/usedCoupons");

const userLogin = async (req, res) => {
  console.log("userLogin");
  console.log(req.body);

  try {
    const user = await User.findOne({ phone: req.body.number });
    if (user) {
      return res.status(200).json({ msg: "wellcome back" });
    } else {
      return res.status(400).json({ msg: "لا يوجد حساب بهذا الرقم" });
    }
  } catch {
    return res.status(401).json({ msg: "لا يوجد حساب بهذا الرقم" });
  }
};

const verifyPhoneNumber = async (req, res) => {
  console.log("verifyPhoneNumber");
  console.log(req.body);
  
  if (req.body.newuser == true) {
    const user = await User.findOne({ phone: req.body.number });
    if (user) return res.status(400).json({ msg: "user already exists " });
  } else if (req.body.newuser == false) {
    const user = await User.findOne({ phone: req.body.number });
    if (!user) return res.status(400).json({ msg: "user is not exsist " });
  }
  var otp = Math.floor(1000 + Math.random() * 9000);
  console.log(otp);
  const number = req.body.number;
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
    msg: ` للتفعيل ${otp} مرحبا بكم في تطبيق جيتك الرجاء استخدام الرقم `,
  });

  try {
    const conformAccount = await new ConformAccount({
      phone: number,
      sentOtp: otp,
    })
      .save()
      .then(() => {
        console.log("new data for conform account ");
        // handle OTP /////////////////////

        const request = httpRequest.request(
          "https://www.msegat.com/gw/sendsms.php",
          options,response=>{
            console.log("Status", response.statusCode);
            console.log("Headers", response.headers);
            let responseData = "";
            if (res.statusCode == 200) {
              return res.status(201).json({ msg: "otp sent to the number" });
            } else {
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

        request.write(data);
        request.end();
      });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ msg: error });
  }
};

// this api is for user register user mobile app
const createUser = async (req, res) => {
  console.log("create user function ");
  console.log(req.body);

  const { firstName, lastName, number, birthday } = req.body;
  // console.log(firstName);
  if (!firstName || !lastName || !number || !birthday) {
    return res.status(403).json({ msg: "Validation failed" });
  }
  var str = req.get("Authorization");
  try {
    const payload = jwt.verify(str, process.env.ACCESS_TOKEN_SECRET, {
      algorithm: "HS256",
    });
    // console.log(payload.id);
    const user = await User.findOne({ phone: payload.phone });
    if (user) return res.status(400).json({ msg: "user already exists " });
    today = new Date();
    today.setHours(0, 0, 0, 0);
    try {
      const user = await new User({
        firstName,
        lastName,
        phone: number,
        birthday,
        sortDate: today,
      })
        .save()
        .then(() => {
          console.log("user registered");
          // handle OTP ////////////////////
          return res.status(201).json({ msg: "User Successfully Registered" });
        });
    } catch (error) {
      console.log(error);
      return res.status(403).json({ msg: err });
    }
  } catch {
    res.status(401);
    res.json({ msg: "Bad Token" });
  }
};
// this route is for user confirm after ckeking the sms sent to his phone number
const confirmUser = async (req, res) => {
  console.log("confirmUser");
  console.log(req.body);
  if (!req.body.number || !req.body.otp) {
    return res.status(403).json({ msg: "Validation failed" });
  }
  try {
    const user = await ConformAccount.findOne({
      phone: req.body.number,
      sentOtp: req.body.otp,
    });
    if (user) {
      var payload = {
        phone: user.phone,
      };
      // console.log(user.phone);
      const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "30d",
      });
      // console.log(token);
      const deleteOtp = await ConformAccount.findByIdAndUpdate(user._id, {
        $set: { sentOtp: "" },
      });
      res.status(200).json({ token });
    }

    if (!user) return res.status(400).json({ msg: "the otp is not correct " });
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: false });
  }
};

const getUserProfile = async (req, res) => {
  console.log("getUserProfile");
  console.log(req.body);
  var str = req.get("Authorization");

  try {
    const payload = jwt.verify(str, process.env.ACCESS_TOKEN_SECRET, {
      algorithm: "HS256",
    });
    // console.log(payload.id);
    const user = await User.findOne({ phone: payload.phone });
    // console.log(user);

    if (user) {
      const getProfilr = await User.findById(user._id);
      if (getProfilr) {
        res.status(200).json(getProfilr);
      } else {
        res.status(400).send({ status: false });
      }
    }
  } catch {
    res.status(401);
    res.json({ msg: "Bad Token" });
  }
};

const updateUserImage = async (req, res) => {
  console.log("updateUserImage");
  console.log(req.body);
  var str = req.get("Authorization");
  try {
    const payload = jwt.verify(str, process.env.ACCESS_TOKEN_SECRET, {
      algorithm: "HS256",
    });
    // console.log(payload.id);
    const user = await User.findOne({ phone: payload.phone });
    const fileName = req.file.filename;
    const basePath = `/public/uploads/`;
    //  const basePath = `${req.get('host')}/public/uploads/`;
    if (user) {
      const UpdateAccount = await User.findByIdAndUpdate(user._id, {
        $set: { photo: `${basePath}${fileName}` },
      });
      if (UpdateAccount) {
        res.status(200).json({ msg: "image updated" });
      } else {
        res.status(400).send({ status: false });
      }
    }
  } catch {
    res.status(401).send("Bad Token");
  }
};

const updateUserPrifile = async (req, res) => {
  const { firstName, lastName, birthday } = req.body;
  console.log("updateUserPrifile");
  console.log(req.body);
  if (!firstName || !lastName || !birthday) {
    return res.status(403).json({ msg: "Validation failed" });
  }
  var str = req.get("Authorization");
  try {
    const payload = jwt.verify(str, process.env.ACCESS_TOKEN_SECRET, {
      algorithm: "HS256",
    });
    // console.log(payload.id);
    const getUser = await User.findOne({ phone: payload.phone });
    // console.log(getUser);
    if (getUser) {
      const updateProfile = await User.findByIdAndUpdate(
        { _id: getUser.id },
        {
          $set: {
            firstName,
            lastName,
            birthday,
          },
        }
      );
      if (updateProfile) {
        res.status(200).json({ msg: "profile updated" });
      } else {
        res.status(400).send({ status: false });
      }
    } else {
      return res.status(400).json({ msg: "user not found " });
    }
  } catch {
    res.status(401).json({ msg: "Bad Token" });
  }
};

const updateAddress = async (req, res) => {
  console.log("updateHomeAddress");
  console.log(req.body);
  const { lat, lng, isHome } = req.body;
  if (!lat || !lng || !isHome) {
    return res.status(403).json({ msg: "Validation failed" });
  }
  var str = req.get("Authorization");
  try {
    const payload = jwt.verify(str, process.env.ACCESS_TOKEN_SECRET, {
      algorithm: "HS256",
    });
    // console.log(payload.id);
    const getUser = await User.findOne({ phone: payload.phone });
    // console.log(getUser);

    if (isHome == true) {
      if (getUser) {
        const updateAddress = await User.findByIdAndUpdate(
          { _id: getUser._id },
          {
            $set: {
              home_lat: lat,
              home_lng: lng,
            },
          }
        );
        if (updateAddress) {
          res.status(200).json({ msg: "home address  updated" });
        } else {
          res.status(400).send({ status: false });
        }
      } else {
        return res.status(400).json({ msg: "user not found " });
      }
    } else if (isHome == false) {
      if (getUser) {
        const updateAddress = await User.findByIdAndUpdate(
          { _id: getUser._id },
          {
            $set: {
              work_lat: lat,
              work_lng: lng,
            },
          }
        );
        if (updateAddress) {
          res.status(200).json({ msg: "work address updated" });
        } else {
          res.status(400).send({ status: false });
        }
      } else {
        return res.status(400).json({ msg: "user not found " });
      }
    }
  } catch {
    res.status(401).json({ msg: "Bad Token" });
  }
};

const deleteUserForTesting = async (req, res) => {
  console.log("deleteUserForTesting");

  try {
    const deleteUser = await User.deleteOne({ phone: req.body.phone });
    if (deleteUser) {
      res.status(200).json({ msg: "user deleted enjoy testing " });
    } else {
      res.status(400).send({ status: false });
    }
  } catch {
    res.status(401).json({ msg: "error" });
  }
};

const getSpForUser = async (req, res) => {
  console.log("getSpForUser");
  console.log(req.body);
  const spId = req.body.spTypeId;

  var str = req.get("Authorization");
  try {
    const payload = jwt.verify(str, process.env.ACCESS_TOKEN_SECRET, {
      algorithm: "HS256",
    });
    // console.log(payload.id);
    const getUser = await User.findOne({ phone: payload.phone });
    // console.log(getUser);
    if (getUser) {
      const Sps = await SpAdmin.find(
        { cpType: spId },
        { password: false, email: false }
      );
      res.status(200).json(Sps);
    } else {
      return res.status(400).json({ msg: "user not found " });
    }
  } catch {
    res.status(401).json({ msg: "Bad Token" });
  }
};

const getSpTypes = async (req, res) => {
  console.log("getSpType");
  var str = req.get("Authorization");
  try {
    const payload = jwt.verify(str, process.env.ACCESS_TOKEN_SECRET, {
      algorithm: "HS256",
    });
    // console.log(payload.id);
    const getUser = await User.findOne({ phone: payload.phone });
    // console.log(getUser);
    if (getUser) {
      const Sps = await spCatogarie.find(
        {},
        { createdAt: false, updatedAt: false, __v: false }
      );
      if (Sps) {
        res.status(200).json(Sps);
      } else {
        return res.status(400).json({ msg: "Sp  not found " });
      }
    } else {
      return res.status(400).json({ msg: "user not found" });
    }
  } catch {
    res.status(401).json({ msg: "Bad Token" });
  }
};

const getSpPeoducts = async (req, res) => {
  console.log("getSpPeoducts");
  console.log(req.body);
  var str = req.get("Authorization");
  const spID = req.body.spID;
  if (!spID) {
    return res.status(403).json({ msg: "Validation failed" });
  }
  try {
    const payload = jwt.verify(str, process.env.ACCESS_TOKEN_SECRET, {
      algorithm: "HS256",
    });
    // console.log(payload.id);
    const getUser = await User.findOne({ phone: payload.phone });
    // console.log(getUser);
    if (getUser) {
      const SpProducts = await Prouduct.find({ sell_point_id: spID });
      res.status(200).json(SpProducts);
    } else {
      return res.status(400).json({ msg: "Sp products  not found " });
    }
  } catch {
    res.status(401).json({ msg: "Bad Token" });
  }
};

const getProductInfo = async (req, res) => {
  console.log("getProductInfo");
  console.log(req.body);
  if (!req.body.pId) {
    return res.status(403).json({ msg: "Validation failed" });
  }
  var str = req.get("Authorization");
  try {
    const payload = jwt.verify(str, process.env.ACCESS_TOKEN_SECRET, {
      algorithm: "HS256",
    });
    // console.log(payload.id);
    const getUser = await User.findOne({ phone: payload.phone });
    console.log(getUser);
    // console.log(getUser);
    if (getUser) {
      const SpProducts = await Prouduct.findOne({ _id: req.body.pId });
      if (SpProducts) {
        return res.status(200).json(SpProducts);
      } else {
        return res.status(400).json({ msg: "no product found" });
      }
    } else {
      return res.status(400).json({ msg: "you can't access " });
    }
  } catch {
    res.status(401).json({ msg: "Bad Token" });
  }
};

const getOldUserOrders = async (req, res) => {
  console.log("getOldUserOrders");
  var str = req.get("Authorization");

  if (!str) {
    res.status(401).json({ msg: "no token provided Token" });

  }
  const payload = jwt.verify(str, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
  });
  // console.log(payload.id);
  const getUser = await User.findOne({ phone: payload.phone });
  if (!getUser) {
    return res.status(400).json({ msg: "you can't access " });
  }
  console.log(getUser.phone);
  // console.log(getUser);
  var mysort = { createdAt: -1 };

  const orders = await Order.find({ user_Phone: getUser.phone }).populate(
    "sell_point_id"
  ).populate(
    '[products_id]'
  ).limit(10).sort(mysort)
  // console.log(orders);
  if (orders.length == 0) {
    return res.status(404).json({ msg: "you don't have any old orders" });
  } else if (orders.length > 0) {
    return res.status(200).json(orders);
  }


};

const getPrices = async (req, res) => {
  console.log("cancelOrder");
  var str = req.get("Authorization");
  try {
    const payload = jwt.verify(str, process.env.ACCESS_TOKEN_SECRET, {
      algorithm: "HS256",
    });
    // console.log(payload.id);
    const getUser = await User.findOne({ phone: payload.phone });
    if (!getUser) {
      return res.status(400).json({ msg: "you can't access " });
    }
    // console.log(getUser.phone);
    // console.log(getUser);
    const fee = await Fee.find();
    if (fee.length > 0) {
      return res.status(200).json(fee);
    } else {
      return res.status(400).json({ msg: "fee not found " });
    }
  } catch {
    res.status(401).json({ msg: "Bad Token" });
  }
};

const getCpInfo = async (req, res) => {
  console.log("getProductInfo");
  console.log(req.body);
  var str = req.get("Authorization");
  try {
    const payload = jwt.verify(str, process.env.ACCESS_TOKEN_SECRET, {
      algorithm: "HS256",
    });
    // console.log(payload.id);
    const getUser = await User.findOne({ phone: payload.phone });
    // console.log(getUser);
    // console.log(getUser);
    if (getUser) {
      const SpProducts = await SpAdmin.findOne({ _id: req.body.spId });
      if (SpProducts) {
        return res.status(200).json(SpProducts);
      } else {
        return res.status(400).json({ msg: "no product found" });
      }
    } else {
      return res.status(400).json({ msg: "you can't access " });
    }
  } catch {
    res.status(401).json({ msg: "Bad Token" });
  }
};

const acceptAnOffer = async (req, res) => {
  console.log("acceptAnOffer");
  console.log(req.body);
  const { captin_phone, price, order_id } = req.body;
  var str = req.get("Authorization");

  // to update order data
  const updateAnOrder = async () => {
    const updateOrder = await Order.findByIdAndUpdate(order_id, {
      $set: { captin_phone: captin_phone, fee: price, status: 2 },
    });

    if (updateOrder) {
      return res.status(200).json({ msg: "you had accept this order" });
    } else {
      return res.status(400).json({ msg: "order not accepted" });
    }
  };
  const getOrder = await Order.findOne({ _id: order_id });

  if (getOrder.status !== 1) {
    console.log(getOrder.status);
    return res.status(400).json({ msg: "the order is already accepted" });
  }
  const payload = jwt.verify(str, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
  });
  // console.log(payload.id);
  const getUser = await User.findOne({ phone: payload.phone });
  if (!getUser) {
    return res.status(400).json({ msg: "you can't access " });
  }
  // console.log(getUser.phone);
  // console.log(getUser);

  const sessiondata = await Sessions.findOne({ captinPhone: captin_phone }).sort({ 'createdAt': -1 }).limit(1);;
  console.log(" session data" + sessiondata);

  if (sessiondata !== null) {
    const socket_id = sessiondata.userSocketIo;

    io.getIO().of("/captins").to(socket_id).emit("AcceptAnOffer", {
      user_phone: getUser.phone,
      order_id: order_id,
    });
    updateAnOrder();
  } else {
    return res.status(400).json({ msg: "captin is not connected " });
  }
  // const socket_id = sessiondata.userSocketIo;
};

const getCaptinInfo = async (req, res) => {
  console.log("getCaptinInfo");
  console.log(req.body);
  var str = req.get("Authorization");
  const { captin_phone } = req.body;

  const payload = jwt.verify(str, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
  });
  // console.log(payload.id);
  const getUser = await User.findOne({ phone: payload.phone });
  if (!getUser) {
    return res.status(400).json({ msg: "you can't access " });
  }

  const catptinData = await Captin.findOne({ phone: captin_phone });

  if (catptinData !== null) {
    return res.status(200).json(catptinData);
  } else {
    return res.status(400).json({ msg: "captin not found " });
  }
};

const getOrderInfo = async (req, res) => {
  console.log("getOrderInfo");
  console.log(req.body);
  var str = req.get("Authorization");
  const { order_id } = req.body;

  const payload = jwt.verify(str, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
  });
  // console.log(payload.id);
  const getUser = await User.findOne({ phone: payload.phone });
  if (!getUser) {
    return res.status(400).json({ msg: "you can't access " });
  }

  const orderData = await Order.findOne({ _id: order_id });

  if (orderData !== null) {
    return res.status(200).json(orderData);
  } else {
    return res.status(400).json({ msg: "captin not found " });
  }
};


const cancelOrder = async (req, res) => {
  console.log("cancelOrder");
  console.log(req.body);
  var str = req.get("Authorization");
  const { order_id } = req.body;

  if (!str) {
    return res.status(401).json({ msg: "no token provided Token" });
  }
  const payload = jwt.verify(str, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
  });
  // console.log(payload.id);
  const getUser = await User.findOne({ phone: payload.phone });
  if (!getUser) {
    return res.status(400).json({ msg: "you can't access " });
  }

  // console.log(getUser.phone);
  const order = await Order.findOne({ '_id': order_id, 'user_Phone': getUser.phone });
  // console.log(order);
  if (!order) return res.status(400).json({ msg: "order is not   exists " });

  console.log(order.status);
  if (order.status == 1) {
    const updateOrder = await Order.findByIdAndUpdate(order_id, {
      $set: { status: 0 },
    });
    if (updateOrder) {
      return res.status(200).json({ msg: "order canceled" });
    } else {
      return res.status(400).json({ msg: "order not canceled" });
    }
  } else {
    return res.status(400).json({ msg: "you can't  cancel the order after you accept an offer" });
  }




}

const getRecentUserOrders = async (req, res) => {
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
  const getUser = await User.findOne({ phone: payload.phone });
  if (!getUser) {
    return res.status(400).json({ msg: "you can't access " });
  }
  console.log(getUser.phone);
  // console.log(getUser);

  const orders = await Order.find({ user_Phone: getUser.phone }).populate(
    "sell_point_id"
  ).populate(
    '[products_id]'
  ).sort({ 'createdAt': -1 }).limit(req.body.count);;

  console.log(orders.length);
  // console.log(orders);
  if (orders.length == 0) {
    return res.status(404).json({ msg: "you don't have any old orders" });
  } else if (orders.length > 0) {
    return res.status(200).json(orders);
  }


};

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
  const getUser = await User.findOne({ phone: payload.phone });
  if (!getUser) {
    return res.status(400).json({ msg: "you can't access " });
  }
  console.log(getUser.phone);

  const order = await Order.findById(req.body.order_id);
  if (!order) {
    return res.status(400).json({ msg: "order not found   " });
  }
  if (order.user_Phone == getUser.phone) {
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


const finishOrder = async (req, res) => {
  console.log("finishOrder");
  console.log(req.body);
  const { orderId, otp } = req.body;
  var str = req.get("Authorization");


  if (!str) {
    res.status(401).json({ msg: "no token provided Token" });
  }
  const payload = jwt.verify(str, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
  });
  // console.log(payload.id);
  const getUser = await User.findOne({ phone: payload.phone });
  if (!getUser) {
    return res.status(400).json({ msg: "you can't access " });
  }
  console.log(getUser.phone);

  const order = await Order.findById(orderId);
  if (!order) {
    return res.status(400).json({ msg: "order not found   " });
  }

  console.log(order.fee + "fee");






  const update = await Order.findByIdAndUpdate(orderId, {
    $set: { status: 5 },
  }).then(
    async () => {
      const data = await Order.findOne({ _id: orderId }).select({
        captin_phone: 1,
      });
      // console.log(data);
      // console.log("user phone");
      console.log(data);
      const phone = data.captin_phone;
      const sessiondata = await Sessions.findOne({ captinPhone: phone }).sort({ 'createdAt': -1 }).limit(1);
      console.log("sessiondata" + sessiondata);
      if (sessiondata !== null) {
        const socket_id = sessiondata.userSocketIo;
        console.log("session data" + sessiondata);
        console.log("from captin socket id is " + socket_id + "from finish order");
        // console.log(user_socket_id);
        // console.log(socket_id );
        console.log("acceptAnOrder user socket id " + socket_id);

        io.getIO().of("/captins").to(socket_id).emit("theorderisfinished", {
          status: 5,
          order_id: orderId,
        });
      }
    }
  ).catch(
    (err) => {
      console.log(err);
      return res.status(400).json({ msg: "order is not  finished" });
    }
  )
  const conformation = await ConformOrderFinish.findOne({
    orderId: orderId,
    sentOtp: otp,
  });
  if (conformation) {

    // console.log(token);
    const deleteOtp = await ConformOrderFinish.findByIdAndUpdate(conformation._id, {
      $set: { sentOtp: "" },
    });

    //calculate 10 % of the fee

    const precentageoffee = order.fee / 10;
    console.log(precentageoffee + "precentageoffee");

    //update user balance 
    console.log("user phone " + order.user_Phone);
    const getUser = await User.findOne({ phone: order.user_Phone });
    const getCaptin = await Captin.findOne({ phone: order.captin_phone });
    const newBalance = Math.round(getUser.balance + precentageoffee);
    const updateBalance = Math.round(getCaptin.balance - precentageoffee);
    console.log("user new balance " + newBalance);
    console.log("user old balance " + getUser.balance);
    console.log("captin new balance " + updateBalance);
    console.log("captin old balance " + getCaptin.balance);
    const updateUserBalance = async () => {
      await User.findByIdAndUpdate(
        { _id: getUser.id },
        {
          $set: {
            balance: newBalance,
          },
        }
      );
    }
    console.log(updateUserBalance);
    const updateCaptinBalance = async () => {
      await Captin.findByIdAndUpdate(
        { _id: getCaptin.id },
        {
          $set: {
            balance: updateBalance,
          },
        }
      );
    }

    updateUserBalance();
    updateCaptinBalance();
    //update captin balance 
    console.log(" captin phone " + order.captin_phone);
    return res.status(200).json({ msg: "order fininsed" });
  }

  if (!conformation) return res.status(400).json({ msg: "the order is not finished " });



}

const payFromBalance = async (req, res) => {
  console.log("payFromBalance");
  console.log(req.body);

  var str = req.get("Authorization");


  if (!str) {
    res.status(401).json({ msg: "no token provided Token" });
  }
  const payload = jwt.verify(str, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
  });
  // console.log(payload.id);
  const getUser = await User.findOne({ phone: payload.phone });
  if (!getUser) {
    return res.status(400).json({ msg: "you can't access " });
  }
  console.log(getUser.phone);


  const { orderId, credit } = req.body;

  if (!orderId || !credit) {
    return res.status(403).json({ msg: "back end validation feialed " });

  }

  const order = await Order.findById(orderId);
  if (!order) {
    return res.status(400).json({ msg: "order is  not found   " });
  }
  console.log(getUser.balance);
  if (getUser.balance < credit) {
    return res.status(400).json({ msg: "your credit is not enough" });
  }

  const newBalance = Math.round(getUser.balance - credit);
  console.log(Math.round(newBalance));
  const updateUserBalance = async () => {
    await User.findByIdAndUpdate(
      { _id: getUser.id },
      {
        $set: {
          balance: newBalance,
        },
      }
    );
  }

  updateUserBalance();

  if (updateUserBalance) {
    return res.status(200).json({ msg: "you have successfully paid" });
  } else {
    return res.status(400).json({ msg: "some this went wronge " });
  }
}

const createSchaduleOrder = async (req, res) => {
  console.log("createSchaduleOrder");
  console.log(req.body);
  if (!req.body.user_Phone || !req.body.sendDate || !req.body.sell_point_id || !req.body.products_id || !req.body.destination_long || !req.body.destination_lat || !req.body.origin_long || !req.body.origin_lat || !req.body.fee  || !req.body.paid || !req.body.distance || !req.body.DeliveryFee) {
    return res.status(400).json({ msg: "Validation failed" });
  }

  let reg = new RegExp(/([0-9]{4}-[0-9]{2}-[0-9]{2}T[01][0-9]{1}:[0-9]{2}:[0-9]{2}.000Z)+/)
  // let validDate = reg.test(req.body.sendDate)
  // if (!validDate) {
  //   return res.status(400).json({ msg: "Date Validation failed" });
  // }
  const sendDate = new Date(req.body.sendDate);
  const tempDate =  new Date(req.body.sendDate);
  tempDate.setMinutes(tempDate.getMinutes() - 1);
  let newDate = tempDate
  console.log({sendDate, newDate});
  const number = req.body.user_Phone;
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
    msg: `هلا من جيتك نحب نذكرك انك عندك معنا طلب بعد ساعه `,
  });

  var REMINDERS = [];
  REMINDERS.push(schedule.scheduleJob(sendDate, function(){
    console.log('last one '+new Date().toString());
    io.getIO().of("/captins").emit("newrequsetdriver", {
      user_Phone: req.body.user_Phone,
      sell_point_id: req.body.sell_point_id,
      products_id: req.body.products_id,
      destination_long: req.body.destination_long,
      destination_lat: req.body.destination_lat,
      origin_long: req.body.origin_long,
      origin_lat: req.body.origin_lat,
      fee: req.body.fee,
      payment: req.body.payment,
      paid: req.body.paid,
      distance: req.body.distance,
      DeliveryFee: req.body.DeliveryFee,
    });
  }));
  console.log("newDate"+newDate);
  REMINDERS.push(schedule.scheduleJob(newDate, function(){
    console.log('first one '+new Date().toString());
    const request = httpRequest.request(
      "https://www.msegat.com/gw/sendsms.php",
      options,
      (response) => {
        console.log("Status", response.statusCode);
        console.log("Headers", response.headers);
        let responseData = "";
       
        response.on("data", (dataChunk) => {
          responseData += dataChunk;
        });
        response.on("end", () => {
          console.log("Response: ", responseData);
        });
      }
    );

    request.on("error", (error) => console.log("ERROR", error));

    request.write(data);
    request.end();
  }));
  
  const order = await new Order({
    user_Phone: req.body.user_Phone,
    sell_point_id: req.body.sell_point_id,
    products_id: req.body.products_id,
    destination_long: req.body.destination_long,
    destination_lat: req.body.destination_lat,
    origin_long: req.body.origin_long,
    origin_lat: req.body.origin_lat,
    fee: req.body.fee,
    payment: req.body.payment,
    paid: req.body.paid,
    distance: req.body.distance,
    status:0
  }).save()
    .then((result) => {
     
      
      console.log("Order created ");
      return res.status(200).json({ msg: "done" })

    })
}

const useaCoupon = async (req, res) => {
  console.log("useaCoupon");
  console.log(req.body);
  const { couponText } = req.body;
  if (!couponText) {
    return res.status(403).json({ msg: "Validation failed" });
  }
  var str = req.get("Authorization");
  if (!str) {
    return res.status(401).json({ msg: "no token provided Token" });
  }
  const payload = jwt.verify(str, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
  });
  // console.log(payload.id);
  const getUser = await User.findOne({ phone: payload.phone });
  if (!getUser) {
    return res.status(400).json({ msg: "you can't access " });
  }
  console.log(getUser.phone);
  const getCoupon = await Coupons.findOne({ coponeText: couponText });
  if (!getCoupon) {
    return res.status(400).json({ msg: "Coupon not found" });
  }

  const getIfUserUseCoupon = await usedCoupons.findOne({
    useId: getUser._id,
    couponId: getCoupon._id,
  });

  if (getIfUserUseCoupon) {
    return res.status(400).json({ msg: "Sorry you used this coupon " });
  }

  try {
    const userCoupon = await new usedCoupons({
      useId: getUser._id,
      couponId: getCoupon._id,
    })
      .save()
      .then(() => {
        console.log(`user ${getUser.name} used ${getCoupon._id} as a coupon`);
        return res.status(200).json(getCoupon)
      });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ msg: error });
  }

}


const serachForaProduct = async (req, res) => {
  console.log("serachForaProduct");
  console.log(req.body);

  var str = req.get("Authorization");

  const key = req.body.key;
  if (!req.body.key) {
    return res.status(403).json({ msg: "Validation failed" });
  }
  if (!str) {
    res.status(401).json({ msg: "no token provided Token" });
  }
  const payload = jwt.verify(str, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
  });
  // console.log(payload.id);
  const getUser = await User.findOne({ phone: payload.phone });
  if (!getUser) {
    return res.status(400).json({ msg: "you can't access " });
  }
  console.log(getUser.phone);

  const getProduct = await Prouduct.find({ name: new RegExp(key, 'i') });
  if (!getProduct) {
    return res.status(400).json({ msg: "لم يتم العثور على المنتج " });
  } else {
    return res.status(200).json(getProduct);

  }
}

const serachForaPointOfSell = async (req, res) => {
  console.log("serachForaPointOfSell");
  console.log(req.body);

  var str = req.get("Authorization");

  const key = req.body.key;

  if (!req.body.key) {
    return res.status(403).json({ msg: "Validation failed" });
  }

  if (!str) {
    res.status(401).json({ msg: "no token provided Token" });
  }
  const payload = jwt.verify(str, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
  });
  // console.log(payload.id);
  const getUser = await User.findOne({ phone: payload.phone });
  if (!getUser) {
    return res.status(400).json({ msg: "you can't access " });
  }
  console.log(getUser.phone);

  const getSp = await SpAdmin.find({ cpName: new RegExp(key, 'i') });
  if (!getSp) {
    return res.status(400).json({ msg: "لم يتم العثور على نقطة البيع  " });
  } else {
    return res.status(200).json(getSp);

  }
}

module.exports = {
  createUser,
  confirmUser,
  updateUserImage,
  getUserProfile,
  cancelOrder,
  updateUserPrifile,
  updateAddress,
  deleteUserForTesting,
  verifyPhoneNumber,
  userLogin,
  getSpForUser,
  getSpTypes,
  getSpPeoducts,
  getProductInfo,
  getOldUserOrders,
  getPrices,
  getCpInfo,
  acceptAnOffer,
  getCaptinInfo,
  getOrderInfo,
  getRecentUserOrders,
  getOrderOldChat,
  finishOrder,
  payFromBalance,
  createSchaduleOrder,
  serachForaProduct,
  serachForaPointOfSell,
  useaCoupon
};
