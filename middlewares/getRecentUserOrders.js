const {check , validationResult} = require('express-validator')

exports.valudateUserRecentOrders=[
    check('count').isNumeric().notEmpty().withMessage('no count provided').isLength({ min: 1, max:3 }).withMessage('count must be at least one digit to 3 digits')
]

exports.userRecentOrdersValidation=(req,res,next)=>{
    const result =  validationResult(req).array()
    if(!result.length) return next();

    const error = result[0].msg;

    res.json({success:false,massage:error})
}