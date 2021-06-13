const express = require('express')
const subAdminControler = require('../controllers/cpadmin-controller');
const adminAuth = require('../utils/authAdmin');
const router = express.Router()
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


router.post('/createCp', upload.single('cpImage'), subAdminControler.createCp);
router.post('/createProduct', upload.single('pImage'), subAdminControler.createProduct);
router.post('/updatePointOfSellImage', upload.single('pImage'), subAdminControler.updatePointOfSellImage);
// router.get('/getAdmins', adminAuth, adminController.getAllAdmins);
router.post('/editProduct', upload.single('pImage'),subAdminControler.editProduct);
router.post('/getProductInfo', subAdminControler.getProductInfo);
router.post('/deleteProdutc', subAdminControler.deleteProdutc);
router.get('/getCpTypes', subAdminControler.getCpTypes);
router.post('/chageState', subAdminControler.chageState);
router.post('/getCpProducts', subAdminControler.getCpProducts);
router.post('/getSPIfo', subAdminControler.getSPIfo);
router.post('/updatePointOfSellData', subAdminControler.updatePointOfSellData);

module.exports = router;