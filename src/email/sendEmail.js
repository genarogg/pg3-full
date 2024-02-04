import nodemailer from 'nodemailer';

const { EMAIL_KEY, EMAIL } = process.env;

const sendEmail = async (recipientEmail, emailSubject, emailBody) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: EMAIL, pass: EMAIL_KEY }
    });

    const mailOptions = {
        from: EMAIL,
        to: recipientEmail,
        subject: emailSubject,
        text: emailBody
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                console.log(`Email sent: ${info.response}`);
                resolve(info);
            }
        });
    });
};


export default sendEmail;