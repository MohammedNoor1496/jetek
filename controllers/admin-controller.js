const Admin = require("../models/Admin");
const User = require("../models/User");
const Captin = require("../models/Captin");
const Order = require("../models/Order");
const Sp = require("../models/SpCatogary");
const Fee = require("../models/Fee");
const ProductCategory = require("../models/PCategory");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const Joi = require("joi");
const {
  FeedbackContext,
} = require("twilio/lib/rest/api/v2010/account/call/feedback");
const createAdmin = async (req, res) => {
  console.log("create Admin function ");
  console.log(req.body);

  const { firstName, lastName, isSubAdmin, isAdmin, password, phone } =
    req.body;
  const email = req.body.email.toLowerCase();
  let testadmin = await Admin.findOne({ email });
  if (testadmin)
    return res.status(400).json({ msg: "Admin  Email already exists " });
  let testadmin1 = await Admin.findOne({ phone: req.body.phone });
  if (testadmin1)
    return res.status(400).json({ msg: "Admin  Phone already exists " });

  try {
    const admin = await new Admin({
      firstName,
      lastName,
      email,
      phone,
      isSubAdmin,
      isConfirmed: false,
      isAdmin,
      password,
    })
      .save()
      .then(() => {
        console.log("admin registered");
        return res.status(201).json({ msg: "Admin Successfully Registered" });
      });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ msg: error });
  }
};

const adminLogin = async (req, res) => {
  // const schema = {
  //     email: Joi.string()
  //         .min(7)
  //         .required()
  //         .email(),
  //     password: Joi.string()
  //         .min(7)
  //         .required()
  //         .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  // }

  // const { error } = Joi.validate(req.body, schema);
  // if (error) {
  //     return res.status(400).send(error.details[0].message);
  // }

  console.log("login Admin function ");
  console.log(req.body);
  let admin = await Admin.findOne({ email: req.body.email.toLowerCase() });

  if (!admin)
    return res
      .status(400)
      .json({ msg: "Login failed wrong admin credentials" });

  const passwordIsValid = await bcrypt.compareSync(
    `` + req.body.password,
    admin.password
  );

  if (!passwordIsValid) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid Password!",
    });
  }

  var token = jwt.sign(
    { id: admin.id },
    process.env.ADMIN_ACCESS_TOKEN_SECRET,
    {
      expiresIn: 86400, // 24 hours
    }
  );

  res.header("auth-token", token).send({
    id: admin._id,
    username: admin.username,
    email: admin.email,
    token: token,
  });
};

const getAllAdmins = async (req, res) => {
  res.send("Get all admins ");
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
    // console.log(allUsers);
  } catch (e) {
    res.status(400).send({ status: false });
  }
};
// this route is for admin only
const getAllCaptins = async (req, res) => {
  try {
    const allCaptins = await Captin.find().sort({ confirmed: 1 });
    res.status(200).json(allCaptins);
  } catch (e) {
    res.status(400).send({ status: false });
  }
};
const getUsersCount = async (req, res) => {
  console.log("getUsersCount");

  try {
    const usersCount = await User.countDocuments();
    return res.status(200).json({ UsersCount: usersCount });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ msg: error });
  }
};

const getCaptinsCount = async (req, res) => {
  console.log("getCaptinsCount");

  try {
    const captinCount = await Captin.countDocuments();
    return res.status(200).json({ CaptinsCount: captinCount });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ msg: error });
  }
};

const sellPointsCount = async (req, res) => {
  console.log("sellPointsCount");

  try {
    const sellPointCount = await Sp.countDocuments();
    return res.status(200).json({ sellPointCount: sellPointCount });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ msg: error });
  }
};

const dailyData = async (req, res) => {
  today = new Date();
  today.setHours(0, 0, 0, 0);

  const captins = await Captin.find({ sortDate: today }).countDocuments();
  const users = await User.find({ sortDate: today }).countDocuments();
  res.status(200).json({
    captins: captins,
    users: users,
  });
};

const getOrdersCount = async (req, res) => {
  console.log("getOrdersCount");

  try {
    const orderCount = await Order.countDocuments();
    return res.status(200).json({ OrderCount: orderCount });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ msg: error });
  }
};

const deleteUser = async (req, res) => {
  console.log("deleteUser");
  console.log(req.body);
  User.deleteOne({ _id: req.body.id })
    .then(() => {
      res.status(200).json({
        message: "Deleted!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

const disableUser = async (req, res) => {
  console.log("disableUser");
  console.log(req.body);
  const user = await User.findOne({ _id: req.body.id });

  changeStatus = false;
  console.log(user.confirmed);
  if (user.confirmed == false) {
    changeStatus = true;
  }
  const disableAccoutn = await User.findByIdAndUpdate(user._id, {
    $set: { confirmed: changeStatus },
  });
  if (disableAccoutn) {
    res.status(200).json({ message: "Disabled!" });
  }
};

const deleteCaptin = async (req, res) => {
  console.log("deleteUser");
  console.log(req.body);
  Captin.deleteOne({ _id: req.body.id })
    .then(() => {
      res.status(200).json({
        message: "Deleted!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

const disableCaptin = async (req, res) => {
  console.log("disableCaptin");
  console.log(req.body);
  const user = await Captin.findOne({ _id: req.body.id });

  changeStatus = false;
  console.log(user.confirmed);
  if (user.confirmed == false) {
    changeStatus = true;
  }
  const disableAccoutn = await Captin.findByIdAndUpdate(user._id, {
    $set: { confirmed: changeStatus },
  });
  if (disableAccoutn) {
    res.status(200).json({ message: "Disabled!" });
  }
};

const addspCatogare = async (req, res) => {
  console.log("addspCatogare");
  console.log(req.body);
  const name = req.body.name;
  const basePath = `/public/uploads/`;
  const filename = req.file.filename;
  const sp = await Sp.findOne({ name: req.body.name });
  if (sp) return res.status(400).json({ msg: "SELL POINT ALERADY EXSIST" });

  try {
    const sp = await new Sp({
      name,
      cptImage: `${basePath}${filename}`,
    })
      .save()
      .then(() => {
        console.log("Sell Point registered");
        return res
          .status(201)
          .json({ msg: "Sell Point Catogare  Successfully Registered" });
      });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ msg: error });
  }
};

const getAllSpCatogaries = async (req, res) => {
  try {
    const AllSpCatogaries = await Sp.find();
    res.status(200).json(AllSpCatogaries);
  } catch (e) {
    res.status(400).send({ status: false });
  }
};

const deleteSpCatogare = async (req, res) => {
  console.log("deleteِSpCatogaries");
  console.log(req.body);
  Sp.deleteOne({ _id: req.body.id })
    .then(() => {
      res.status(200).json({
        message: "Deleted!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

const addPCatogare = async (req, res) => {
  console.log("addPCatogare");
  console.log(req.body);
  const name = req.body.name;
  const pcat = await ProductCategory.findOne({ name: req.body.name });
  if (pcat)
    return res.status(400).json({ msg: "prouduct catogery ALERADY EXSIST" });

  try {
    const pcat = await new ProductCategory({
      name,
    })
      .save()
      .then(() => {
        console.log("prouduct catogery registered");
        return res
          .status(201)
          .json({ msg: "prouduct catogery Successfully Registered" });
      });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ msg: error });
  }
};

const getAllPCatogaries = async (req, res) => {
  console.log("getAllPCatogaries");
  console.log(req.body);
  try {
    const AllProductCategory = await ProductCategory.find();
    res.status(200).json(AllProductCategory);
  } catch (e) {
    res.status(400).send({ status: false });
  }
};

const deletePCatogare = async (req, res) => {
  console.log("deletePCatogare");
  console.log(req.body);
  ProductCategory.deleteOne({ _id: req.body.id })
    .then(() => {
      res.status(200).json({
        message: "Deleted!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

const getCaptinInfo = async (req, res) => {
  console.log("getCaptinInfo");
  console.log(req.body);

  try {
    // console.log(payload.id);
    const getCaptin = await Captin.findOne({ phone: req.body.number });
    // console.log(getCaptin);
    if (getCaptin) {
      res.status(200).json(getCaptin);
    } else {
      res.status(400).json({ msg: "captin not found" });
    }
  } catch {
    res.status(400).json({ msg: "B" });
  }
};

const getUserInfo = async (req, res) => {
  console.log("getCaptinInfo");
  console.log(req.body);

  try {
    // console.log(payload.id);
    const getUser = await User.findOne({ phone: req.body.number });
    // console.log(getUser);
    if (getUser) {
      res.status(200).json(getUser);
    } else {
      res.status(400).json({ msg: "captin not found" });
    }
  } catch {
    res.status(400).json({ msg: "B" });
  }
};

const updateCaptinBalance = async (req, res) => {
  console.log("updateCaptinBalance");
  console.log(req.body);
  try {
    // console.log(payload.id);
    const findCaptin = await Captin.findOne({ phone: req.body.number });
    // console.log(findCaptin);
    if (findCaptin) {
      const updateBalance = await Captin.findByIdAndUpdate(
        { _id: findCaptin.id },
        {
          $set: {
            balance: req.body.newBalance,
          },
        }
      );
      if (updateBalance) {
        res.status(200).json({ msg: "profile updated" });
      } else {
        res.status(400).send({ status: false });
      }
    }
  } catch (err) {
    return res.status(400).json({ msg: err });
  }
};

const updatePrices = async (req, res) => {
  console.log("updatePrices");

  console.log(req.body);
  try {
      // console.log(payload.id);
      const findFee = await Fee.findOne();
      // console.log(findCaptin);
      if (findFee) {
          const updateBalance = await Fee.findByIdAndUpdate({ _id: findFee.id }, {
              $set: {
                  feePerTime: req.body.feePerTime,
                  FeePerDistance: req.body.FeePerDistance,
              }
          });
          if (updateBalance) {
              res.status(200).json({ msg: "Fee  updated" })
          } else {
              res.status(400).send({ "status": false })
          }
      }
  } catch (err) {
      return res.status(400).json({ msg: err })
  }
 
}
module.exports = {
  createAdmin,
  getAllAdmins,
  adminLogin,
  getAllUsers,
  getAllCaptins,
  getUsersCount,
  getCaptinsCount,
  sellPointsCount,
  dailyData,
  getOrdersCount,
  deleteUser,
  disableUser,
  deleteCaptin,
  disableCaptin,
  addspCatogare,
  getAllSpCatogaries,
  deleteSpCatogare,
  addPCatogare,
  getAllPCatogaries,
  deletePCatogare,
  getCaptinInfo,
  getUserInfo,
  updateCaptinBalance,
  updatePrices,
};
