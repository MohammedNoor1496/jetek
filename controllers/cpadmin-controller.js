const SpAdmin = require('../models/SpAdmin');
var jwt = require('jsonwebtoken');
const Prouduct = require('../models/Products');
const spCatogarie = require('../models/SpCatogary');
const spAdmin = require('../models/SpAdmin');
var bcrypt = require("bcryptjs");

// var io = require('./socket').init(server);
const getSPIfo = async (req, res) => {
    console.log("getSPIfo");
    console.log(req.body);
    const pId = req.body.spId;
    try {
        const Sp = await spAdmin.findOne({ '_id': pId });
        if (Sp) {
            res.status(200).json(Sp)
        } else {
            res.status(400).send({ msg: "Sp not found " })
        }
    } catch (error) {
        res.status(401).json({ msg: "error" });
        console.log(error);
    }
}

const createCp = async (req, res) => {
    console.log("create Sub Admin function ");
    console.log(req.body);

    const { cpName, cpType, email, commercialRegister, password, mobile, lat, lng } = req.body;

    let testadmin = await SpAdmin.findOne({ email: req.body.email });
    if (testadmin) return res.status(400).json({ msg: "Sub Admin  Email already exists " });
    let testadmin1 = await SpAdmin.findOne({ phone: req.body.mobile });
    if (testadmin1) return res.status(400).json({ msg: "Sub Admin  Phone already exists " });

    try {
        const admin = await new SpAdmin(
            {
                cpName,
                cpType,
                email: email.toLowerCase(),
                commercialRegister,
                password,
                phone: mobile,
                lat,
                lng,
                isConfirmed: false,
            }
        ).save()
            .then(() => {
                console.log(" cp admin registered");
                return res.status(201).json({ msg: "sub Admin Successfully Registered" });
            })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error });
    }
}

const createProduct = async (req, res) => {
    console.log("createProduct");
    console.log(req.body);
    const basePath = `/public/uploads/`;
    const filename = req.file.filename;
    const { name, price, sell_point_id } = req.body;
    let testProduct = await SpAdmin.findOne({ name: req.body.name });
    if (testProduct) return res.status(400).json({ msg: "Product  already exists " });
    try {
        const product = await new Prouduct(
            {
                name,
                price,
                photo: `${basePath}${filename}`,
                sell_point_id,

            }
        ).save()
            .then(() => {
                console.log(" cp admin registered");
                return res.status(201).json({ msg: "Product Successfully Registered" });
            })

    } catch (error) {
        console.log(error);
        return res.status(403).json({ msg: error });
    }

}

const deleteProdutc = async (req, res) => {
    console.log("deleteProdutc");
    console.log(req.body);
    const spId = req.body.sell_point_id;
    const pId = req.body.pId;

    try {
        const deleteProduct = await Prouduct.findByIdAndDelete({ '_id': pId, 'sell_point_id': spId });
        if (deleteProduct) {
            res.status(200).json({ msg: "Product Delete Successfully " })
        } else {
            res.status(400).send({ "status": false })
        }

    } catch (error) {
        res.status(401).json({ msg: "error" });
        console.log(error);
    }
}

const editProduct = async (req, res) => {
    console.log("editProduct");
    console.log(req.body);
    const basePath = `/public/uploads/`;
    const filename = req.file.filename;
    const { name, price, } = req.body;
    const productId = req.body.productId;
    const sell_point_id = req.body.sell_point_id;

    const updateProduct = await Prouduct.findByIdAndUpdate({ '_id': req.body.productId, 'sell_point_id': sell_point_id }, {
        $set: {
            name,
            price,
            photo: `${basePath}${filename}`,
        }
    });
    if (updateProduct) {
        res.status(200).json({ msg: "Product updated" })
    } else {
        res.status(400).send({ "status": false })

    }

}

const getCpTypes = async (req, res) => {
    const Sps = await spCatogarie.find({}, { 'createdAt': false, 'updatedAt': false, '__v': false });
    if (Sps) {
        res.status(200).json(Sps)

    } else {
        return res.status(400).json({ msg: "Sp  not found " });

    }

}

const getCpProducts = async (req, res) => {
    console.log("getCpProducts");
    console.log(req.body);
    const sell_point_id = req.body.sell_point_id;

    const SpProducts = await Prouduct.find({ 'sell_point_id': sell_point_id }, { '__v': false });
    if (SpProducts) {
        res.status(200).json(SpProducts)

    } else {
        return res.status(400).json({ msg: "Sp  not found " });

    }
}

const getProductInfo = async (req, res) => {
    console.log("getProductInfo");
    console.log(req.body);
    const spId = req.body.sell_point_id;
    const pId = req.body.pId;
    try {
        const Product = await Prouduct.findOne({ '_id': pId, 'sell_point_id': spId });
        if (Product) {
            res.status(200).json(Product)
        } else {
            res.status(400).send({ msg: "product not found " })
        }
    } catch (error) {
        res.status(401).json({ msg: "error" });
        console.log(error);
    }
}

const chageState = async (req, res) => {
    console.log("chageState");
    console.log(req.body);
    const updateState = await SpAdmin.findByIdAndUpdate({ '_id': req.body.spId }, {
        $set: {
            status: req.body.status
        }
    });
    if (updateState) {
        res.status(200).json({ msg: "status changed" })
    } else {
        res.status(400).send({ "status": false })
    }

}

const updatePointOfSellImage = async (req, res) => {
    console.log("updatePointOfSellImage");
    console.log(req.body);
    const sell_point_id = req.body.sell_point_id;
    const basePath = `/public/uploads/`;
    const filename = req.file.filename;
    const updateProduct = await SpAdmin.findByIdAndUpdate({ '_id': sell_point_id }, {
        $set: {

            cpImage: `${basePath}${filename}`,
        }
    });
    if (updateProduct) {
        res.status(200).json({ msg: "Point Of Sell updated" })
    } else {
        res.status(400).send({ "status": false })

    }
}

const updatePointOfSellData = async (req, res) => {
    console.log("updatePointOfSellData");
    console.log(req.body);
    const { sell_point_id, phone, email, name } = req.body;

    const updateProduct = await SpAdmin.findByIdAndUpdate({ '_id': sell_point_id }, {
        $set: {
            cpName: name,
            email: email,
            phone: phone
        }
    });
    if (updateProduct) {
        res.status(200).json({ msg: "Point Of Sell updated" })
    } else {
        res.status(400).send({ "status": false })

    }

}


const pointOfSellLogin = async (req, res) => {
    console.log("pointOfSellLogin");
    console.log(req.body);
    const { email, password } = req.body;

    let spAdmin = await SpAdmin.findOne({ email: email.toLowerCase() });

    if (!spAdmin)
        return res
            .status(400)
            .json({
                auth: false,
                msg: "البيانات التي تريد تسجيل الدخول بها خاطئة "
            });

    if (!spAdmin.isConfirmed) {
        return res
            .status(400)
            .json({
                auth: false,
                msg: "لم يتم تفعيل الحساب الرجاء التواصل مع الادارة حتي يتم تفعيل حسابك "
            });

    }

    const passwordIsValid = await bcrypt.compareSync(
        `` + password,
        spAdmin.password
    );

    if (!passwordIsValid) {
        return res.status(401).send({
            auth: false,
            message: "البيانات التي تريد تسجيل الدخول بها خاطئة ",
        });
    }

    var token = jwt.sign(
        { id: spAdmin.id },
        process.env.ADMIN_ACCESS_TOKEN_SECRET,
        {
            expiresIn: 86400, // 24 hours
        }
    );

    res.header("auth-token", token).send({

        result: spAdmin,
        token: token,
        auth: true
    });
}

module.exports = {
    createCp,
    getSPIfo,
    createProduct,
    deleteProdutc,
    editProduct,
    getCpTypes,
    getCpProducts,
    getProductInfo,
    chageState,
    updatePointOfSellImage,
    updatePointOfSellData,
    pointOfSellLogin
}