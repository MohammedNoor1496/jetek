const express = require('express')
const subAdminControler = require('../controllers/cpadmin-controller');
const adminAuth = require('../utils/authAdmin');
const router = express.Router()
var multer = require('multer')
var jwt = require("jsonwebtoken");

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

const verifySellPointAdmin =(req,res,next)=>{
    const token = req.headers["auth-token"];
    if(!token){
        return res.status(400).json({ msg: "you can't access " });
    }else{
        jwt.verify(token,process.env.ADMIN_ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if (err) {
                return res.status(400).json({ msg: "u falid to authanticate " });

            } else {
                req.userId =decoded.id;
                next();
            }
        })
    }
}


router.post('/createCp', upload.single('cpImage'), subAdminControler.createCp);
router.post('/createProduct', verifySellPointAdmin, upload.single('pImage'), subAdminControler.createProduct);
router.post('/updatePointOfSellImage', verifySellPointAdmin, upload.single('pImage'), subAdminControler.updatePointOfSellImage);
// router.get('/getAdmins', adminAuth, adminController.getAllAdmins);
router.post('/editProduct', verifySellPointAdmin, upload.single('pImage'),subAdminControler.editProduct);
router.post('/getProductInfo', verifySellPointAdmin, subAdminControler.getProductInfo);
router.post('/deleteProdutc', verifySellPointAdmin, subAdminControler.deleteProdutc);
router.get('/getCpTypes', verifySellPointAdmin,subAdminControler.getCpTypes);
router.post('/chageState', verifySellPointAdmin, subAdminControler.chageState);
router.post('/getCpProducts', verifySellPointAdmin, subAdminControler.getCpProducts);
router.post('/getSPIfo', verifySellPointAdmin, subAdminControler.getSPIfo);
router.post('/updatePointOfSellData', verifySellPointAdmin, subAdminControler.updatePointOfSellData);
router.post('/pointOfSellLogin', subAdminControler.pointOfSellLogin);

module.exports = router;