const {check , validationResult} = require('express-validator')

exports.valudateCancelOrder=[
    check('order_id').trim().notEmpty().withMessage('no order id provided').isLength({ min: 24, max:24 }).withMessage('Order id must be 16 charector')
]

exports.cancelOrderValidation=(req,res,next)=>{
    const result =  validationResult(req).array()
    if(!result.length) return next();

    const error = result[0].msg;

    res.json({success:false,massage:error})
}