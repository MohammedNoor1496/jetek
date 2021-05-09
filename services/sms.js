var accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_ACCOUNT_TOKEN;   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

async function sendVeriSms(phone, otp) {
    client.messages.create({
        body: ` مرحبا بكم في جيتك  
        نرجو منك استخدام الرقم التالي لتفعيل حستابك  ${otp}
        `,
        to: phone,  // Text this number
        from: process.env.TWILIO_PHONE_NUMBER // From a valid Twilio number
    })
        .then((message) => console.log('OTP', message.errorMessage))
        .catch((err) => console.log(err));
}


exports.sendVeriSms = sendVeriSms;
