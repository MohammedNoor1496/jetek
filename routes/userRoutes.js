const express = require('express')
const userController = require('../controllers/user-controller');
const userAuth = require('../utils/auth');
const router = express.Router()
var multer = require('multer')
const  {valudateCancelOrder, cancelOrderValidation} = require('../middlewares/cancelOrder');

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


router.post('/createuser', userController.createUser);
router.post('/confirmUser', userController.confirmUser);
router.post('/updateUserImage', upload.single('file'), userController.updateUserImage);
router.get('/getUserProfile', userController.getUserProfile);
router.get('/getOldUserOrders', userController.getOldUserOrders);
router.post('/updateUserPrifile', userController.updateUserPrifile);
router.post('/updateAddress', userController.updateAddress);
router.post('/deleteUserForTesting', userController.deleteUserForTesting);
router.post('/verifyPhoneNumber', userController.verifyPhoneNumber);
router.post('/userLogin', userController.userLogin);
router.post('/getSpForUser', userController.getSpForUser);
router.post('/getSpTypes', userController.getSpTypes);
router.post('/getSpPeoducts', userController.getSpPeoducts);
router.post('/getProductInfo', userController.getProductInfo);
router.post('/getCpInfo', userController.getCpInfo);
router.post('/acceptAnOffer', userController.acceptAnOffer);
router.post('/getCaptinInfo', userController.getCaptinInfo);
router.post('/getOrderInfo', userController.getOrderInfo);
router.get('/getPrices', userController.getPrices);
router.post('/cancelOrder',valudateCancelOrder,cancelOrderValidation,userController.cancelOrder);


module.exports = router;