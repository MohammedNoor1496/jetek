const express = require("express");
const captinController = require("../controllers/captin-controller");
const captinAuth = require("../utils/auth");
const router = express.Router();

var multer = require("multer");

// this is a middleware for multer to upload the profile image
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    cb(null, Date.now() + "-" + fileName);
  },
});
var upload = multer({ storage: storage });
const files = upload.fields([
  { name: "drivingLicense", maxCount: 1 },
  { name: "vehicleLicense", maxCount: 1 },
  { name: "frontOfvehicle", maxCount: 1 },
  { name: "backOfvehicle", maxCount: 1 },
  { name: "leftSideOfvehicle", maxCount: 1 },
  { name: "rightSideOfvehicle", maxCount: 1 },
  { name: "photo", maxCount: 1 },
]);

router.post("/createcaptin", files,captinController.createCaptin);
router.post("/acceptAnOrder", files,captinController.acceptAnOrder);
router.post("/deleteCaptinForTesting", captinController.deleteCaptinForTesting);
router.post("/getOldCaptinOrders", captinController.getOldCaptinOrders);
router.post("/getNotAcceptedOrders", captinController.getNotAcceptedOrders);
router.post("/getUserInfo", captinController.getUserInfo);
router.post("/updateCaptinLocation", captinController.updateCaptinLocation);
router.post("/updateOrderState", captinController.updateOrderState);
router.post("/getOrderOldChat", captinController.getOrderOldChat);

module.exports = router;
