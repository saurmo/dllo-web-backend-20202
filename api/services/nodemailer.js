const nodemailer = require("nodemailer");
module.exports = {
  async sendMail(to, subject, body) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.mi.com.co",
      port: 465,
      secure: true,
      auth: {
        user: "no-reply@saurmo.com",
        pass: process.env.PASSWORD_EMAIL,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Pruebas 👻" <no-reply@saurmo.com>', // sender address
      to, // list of receivers
      subject, // Subject line
      text: body, // plain text body
      html: body, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  },
};
