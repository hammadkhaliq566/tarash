
import nodemailer from 'nodemailer'; 


export const sendMail = async (req, res) => {
    try {
        
        const toEmail = req.body.toEmail;
        const subject = req.body.subject;
        const message = req.body.message;

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: 'gmail',
            port: 465,
            secure: true,
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.APP_PASSWORD,
            },
        });

        const mailOptions = {
            from: {
                name: 'Taraash',
                address: process.env.SENDER_EMAIL,
            },
            to: 'diyanarooma59@gmail.com',
            subject: subject,
            text:message,
            html: `${message}`
        };

        try {
            transporter.sendMail(mailOptions);
            console.log("Email has been sent successfully");
            // res.status(200).send({ message: 'Email sent successfully' });
        } catch (error) {
            console.error("Transporter Catch: ", error);
        }

    } catch (error) {
        console.error('Error:', error);
    }
};



export const sendCustomerMail = async (req, res) => {
    try {
        
        const to = req.body.to;
        const subject = req.body.subject;
        const message = req.body.message;

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: 'gmail',
            port: 465,
            secure: true,
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.APP_PASSWORD,
            },
        });

        const mailOptions = {
            from: {
                name: 'Taraash',
                address: process.env.SENDER_EMAIL,
            },
            to: to || "diyanarooma59@gmail.com",
            subject: subject,
            text:message,
            html: `${message}`
        };

        try {
            transporter.sendMail(mailOptions);
            console.log("Email has been sent successfully");
            
        } catch (error) {
            console.error("Transporter Catch: ", error);
        }

    } catch (error) {
        console.error('Error:', error);
    }
};


