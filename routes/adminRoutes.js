const express = require('express');
const jwt = require('jsonwebtoken');
const adminController = require('../controllers/admin-controller');
const adminAuth = require('../utils/authAdmin');
const router = express.Router()

function ensureAuthenticatedAdmin(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({ msg: 'no token ' });

    try {
        const verified = jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'in valid  token ' });
    }
};

var multer = require('multer')

// this is a middleware for multer to upload the profile image 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        cb(null, Date.now() + '-' + fileName)
    }
})
var upload = multer({ storage: storage })


router.post('/creatAdmin', adminController.createAdmin);
router.get('/getAdmins', ensureAuthenticatedAdmin, adminController.getAllAdmins);
router.get('/getAllUsers', adminController.getAllUsers);
router.get('/getAllCaptins', adminController.getAllCaptins);
router.get('/getUsersCount', adminController.getUsersCount);
router.get('/getCaptinsCount', adminController.getCaptinsCount);
router.get('/getOrdersCount', adminController.getOrdersCount);
router.get('/sellPointsCount', ensureAuthenticatedAdmin, adminController.sellPointsCount);
router.get('/dailyData', adminController.dailyData);
router.get('/getAllSpCatogaries', adminController.getAllSpCatogaries);
router.get('/getAllPCatogaries', adminController.getAllPCatogaries);
router.post('/adminLogin', adminController.adminLogin)
router.post('/deleteUser', adminController.deleteUser)
router.post('/disableUser', adminController.disableUser)
router.post('/deleteCaptin', adminController.deleteCaptin)
router.post('/disableCaptin', adminController.disableCaptin)
router.post('/addspCatogare', upload.single('cptImage'), adminController.addspCatogare)
router.post('/deleteSpCatogare', adminController.deleteSpCatogare)
router.post('/addPCatogare', adminController.addPCatogare)
router.post('/deletePCatogare', adminController.deletePCatogare)
router.post('/getCaptinInfo', adminController.getCaptinInfo)
router.post('/getUserInfo', adminController.getUserInfo)
router.post('/updateCaptinBalance', adminController.updateCaptinBalance)

module.exports = router;