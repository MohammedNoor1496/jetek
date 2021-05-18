const SpAdmin = require('../models/SpAdmin');
var jwt = require('jsonwebtoken');
const Prouduct = require('../models/Products');
const spCatogarie = require('../models/SpCatogary');


const createCp = async (req, res) => {
    console.log("create Sub Admin function ");
    console.log(req.body);
    const basePath = `/public/uploads/`;
    const filename = req.file.filename;

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
                email,
                commercialRegister,
                password,
                phone: mobile,
                lat,
                lng,
                cpImage: `${basePath}${filename}`,
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
    const { name, price, category_id, sell_point_id } = req.body;
    let testProduct = await SpAdmin.findOne({ name: req.body.name });
    if (testProduct) return res.status(400).json({ msg: "Product  already exists " });
    try {
        const product = await new Prouduct(
            {
                name,
                price,
                photo: `${basePath}${filename}`,
                sell_point_id,
                category_id
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
    try {
        const deleteProduct = await Prouduct.deleteOne({ 'id': req.body.pId, 'sell_point_id': req.body.spId });
        if (deleteProduct) {
            res.status(200).json({ msg: "Product Delete Successfully " })
        } else {
            res.status(400).send({ "status": false })
        }

    } catch {
        res.status(401).json({ msg: "error" });
    }
}

const editProduct = async (req, res) => {
    console.log("editProduct");
    console.log(req.body);
    const { name, price, category_id } = req.body;

    const updateProduct = await Prouduct.findByIdAndUpdate({ id: req.body.productId }, {
        $set: {
            name,
            price,
            category_id,
        }
    });
    if (updateProduct) {
        res.status(200).json({ msg: "Product updated" })
    } else {
        res.status(400).send({ "status": false })

    }

}

const getCpTypes = async (req,res)=>{
    const Sps = await spCatogarie.find({}, { 'createdAt': false, 'updatedAt': false, '__v': false });
    if (Sps) {
        res.status(200).json(Sps)

    } else {
        return res.status(400).json({ msg: "Sp  not found " });

    }

}


module.exports = {
    createCp,
    // getAllAdmins,
    createProduct,
    deleteProdutc,
    editProduct,
    getCpTypes
}