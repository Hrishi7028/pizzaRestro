const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, isUser, text) => {
    try {
        let testAccount = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 465,
            secure: true,
            secureConnection: false,
            auth: {

                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASS,
            },
            tls: {
                rejectUnAuthorized: true
            }
        });

        await transporter.sendMail({
            from: process.env.USER_EMAIL,
            to: email,
            subject: subject,
            html: `
            <html>
            <h2>Hello,${isUser.Fname}
            user Id :${isUser._id}  
            You are requested for resetting password so kindly click below link..</h2>
            <a href=${text}>Click here</a>
            <br/>
            </html>
            
            `,
        });

        // console.log("email sent sucessfully");
    } catch (error) {
        console.log(error);
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;