var nodemailer = require("nodemailer");

module.exports = {
    sendEmail: function(transporter, mailOptions, callback) {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, info);
        });
    },

    sendValidateEmail: function(toWho, callback) {
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'auction.udweb@gmail.com',
                pass: 'auctionudweb'
            }
        });

        let token = TokenService.generateToken(7);
        let mailOptions = {
            from: '"Auction 👻" <auction.udweb@gmail.com>', // sender address
            to: 'pqnguyen1996@gmail.com', // list of receivers
            subject: 'Auction', // Subject line
            text: 'Confirm your email in Auction', // plain text body
            html: `<div style="padding:0px 40px 0px 40px">
                        <h2 style="font-weight:bold">Hi </h2>
                        <p>Thank you for registering in Auction. To fully activate your account we need you to validate your email by clicking on the link below.</p>
                        <br>
                        <center>
                            <a style="background:#8cc63f;color:#ffffff;padding:15px 20px;border-radius:5px" 
                                href="http://localhost:1337/user/validate_email?token=${token}&email=${toWho}">Confirm my email</a>
                        </center>
                        <br>
                        <br>
                            <p style="margin:0">Click here to confirm your email address: <a style="color:#4d4d4d" 
                                href="http://localhost:1337/user/validate_email?token=${token}&email=${toWho}">https://Auction.com/<wbr>profile/validate_email/?token=<wbr>${token}&amp;email=pqnguyen1996@<wbr>gmail.com</a></p>
                        <p><b>Team Auction</b></p>
				    </div>` // html body
        };
        this.sendEmail(transporter, mailOptions, (error, info) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, token);
        });
    }
}