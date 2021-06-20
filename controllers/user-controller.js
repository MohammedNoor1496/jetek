const User = require("../models/User");
var jwt = require("jsonwebtoken");
const { number } = require("joi");
const ConformAccount = require("../models/ConformAccount ");
const { Long } = require("bson");
const SpAdmin = require("../models/SpAdmin");
const spCatogarie = require("../models/SpCatogary");
const Prouduct = require("../models/Products");
var io = require("../socket");
const Order = require("../models/Order");
const Fee = require("../models/Fee");
const Sessions = require("../models/sessions");
const httpRequest = require("https");
const Captin = require("../models/Captin");

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
          options,
          (response) => {
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
  try {
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
    ).limit(10)
    // console.log(orders);
    if (orders.length == 0) {
      return res.status(404).json({ msg: "you don't have any old orders" });
    } else if (orders.length > 0) {
      return res.status(200).json(orders);
    }
  } catch {
    res.status(401).json({ msg: "Bad Token" });
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

  const sessiondata = await Sessions.findOne({ captinPhone: captin_phone });
  console.log("session data" + sessiondata);

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


const cancelOrder = async (req,res) =>{
  console.log("cancelOrder");
  console.log(req.body);
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
};
