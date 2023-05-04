// api/index.js
const express = require("express");
const axios = require('axios');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const router = express.Router();
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.REACT_APP_TERMI_API_KEY;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: ['http://localhost:3000', 'https://hairbytimablaq.com'],
}));

  
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/", function (_, res) {
    res.sendFile(
        path.join(__dirname, "../client/build/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
});


 

router.post('/send-code-phone', async (req, res) => {

    const data = {
        api_key: API_KEY,
        message_type: 'NUMERIC',
        to: req.body.phone_number,
        from: 'HairbyTimaB',
        channel: 'generic',
        pin_attempts: 10,
        pin_time_to_live: 30,
        pin_length: 6,
        pin_placeholder: '< 1234 >',
        message_text: 'Your hairbytimablaq confirmation code is < 1234 >. It expires in 30 minutes',
        pin_type: 'NUMERIC'
    };

    axios.post('https://api.ng.termii.com/api/sms/otp/send', data)
        .then(response => {
            console.log(response.data);
            res.json({ pinId: response.data.pinId, data: response.data });
        })
        .catch(error => {
            console.log(error.response.status);
            res.json(response);
        });
});



// Handle email verification requests
router.post('/send-code-email', async (req, res) => {
    const { to, from, subject, verification_code } = req.body;

    // Create a nodemailer transporter
    let transporter = nodemailer.createTransport({
        host: "smtp.elasticemail.com",
        port: 2525,
        auth: {
            user: "support@hairbytimablaq.com",
            pass: "BE7BB8AA3222B7E25C81666CB32F01882134",
        },
    });

    // Render the email template with the data
    let html = await ejs.renderFile(path.join(__dirname, 'verification-email.ejs'), {
        verificationCode: verification_code,
    });

    // Define the email message
    let message = {
        from: from,
        to: to,
        subject: subject,
        html: html,
    };

    try {
        // Send email
        await transporter.sendMail(message);
        res.status(200).json({ message: 'Email sent successfully' });
        console.log("email sent");
    } catch (error) {
        console.error(error);
        console.log(error);
        res.status(500).json({ message: 'Failed to send email' });
    }

});




// Handle order placed confirmation
router.post('/order-placed', async (req, res) => {
    const { to, from, subject, order_id } = req.body;

    // Create a nodemailer transporter
    let transporter = nodemailer.createTransport({
        host: "smtp.elasticemail.com",
        port: 2525,
        auth: {
            user: process.env.REACT_router_ELASTIC_EMAIL_USERNAME,
            pass: process.env.REACT_router_ELASTIC_EMAIL_PASSWORD,
        },
    });

    // Render the email template with the data
    let html = await ejs.renderFile(path.join(__dirname, 'order-placed.ejs'), {
        orderId: order_id,
    });

    // Define the email message
    let message = {
        from: from,
        to: to,
        subject: subject,
        html: html,
    };

    try {
        // Send email
        await transporter.sendMail(message);
        res.status(200).json({ message: 'Email sent successfully' });
        console.log("email sent");
    } catch (error) {
        console.error(error);
        console.log(error);
        res.status(500).json({ message: 'Failed to send email' });
    }

});


// Handle order placed confirmation
router.post('/order-confirmed', async (req, res) => {
    const { to, from, subject, order_id } = req.body;

    // Create a nodemailer transporter
    let transporter = nodemailer.createTransport({
        host: "smtp.elasticemail.com",
        port: 2525,
        auth: {
            user: "support@hairbytimablaq.com",
            pass: "BE7BB8AA3222B7E25C81666CB32F01882134",
        },
    });

    // Render the email template with the data
    let html = await ejs.renderFile(path.join(__dirname, 'order-confirmed.ejs'), {
        orderId: order_id,
    });

    // Define the email message
    let message = {
        from: from,
        to: to,
        subject: subject,
        html: html,
    };

    try {
        // Send email
        await transporter.sendMail(message);
        res.status(200).json({ message: 'Email sent successfully' });
        console.log("email sent");
    } catch (error) {
        console.error(error);
        console.log(error);
        res.status(500).json({ message: 'Failed to send email' });
    }

});


// Handle order placed confirmation
router.post('/order-shipped', async (req, res) => {
    const { to, from, subject, order_id } = req.body;

    // Create a nodemailer transporter
    let transporter = nodemailer.createTransport({
        host: "smtp.elasticemail.com",
        port: 2525,
        auth: {
            user: "support@hairbytimablaq.com",
            pass: "BE7BB8AA3222B7E25C81666CB32F01882134",
        },
    });

    // Render the email template with the data
    let html = await ejs.renderFile(path.join(__dirname, 'order-shipped.ejs'), {
        orderId: order_id,
    });

    // Define the email message
    let message = {
        from: from,
        to: to,
        subject: subject,
        html: html,
    };

    try {
        // Send email
        await transporter.sendMail(message);
        res.status(200).json({ message: 'Email sent successfully' });
        console.log("email sent");
    } catch (error) {
        console.error(error);
        console.log(error);
        res.status(500).json({ message: 'Failed to send email' });
    }

});


// Handle order placed confirmation
router.post('/order-delivered', async (req, res) => {
    const { to, from, subject, order_id, delivery_method } = req.body;

    // Create a nodemailer transporter
    let transporter = nodemailer.createTransport({
        host: "smtp.elasticemail.com",
        port: 2525,
        auth: {
            user: "support@hairbytimablaq.com",
            pass: "BE7BB8AA3222B7E25C81666CB32F01882134",
        },
    });

    // Render the email template with the data
    let html = await ejs.renderFile(path.join(__dirname, 'order-delivered.ejs'), {
        orderId: order_id,
        deliveryMethod: delivery_method,
    });

    // Define the email message
    let message = {
        from: from,
        to: to,
        subject: subject,
        html: html,
    };

    try {
        // Send email
        await transporter.sendMail(message);
        res.status(200).json({ message: 'Email sent successfully' });
        console.log("email sent");
    } catch (error) {
        console.error(error);
        console.log(error);
        res.status(500).json({ message: 'Failed to send email' });
    }

});




// Handle new moderators
router.post('/new-moderator', async (req, res) => {
    const { to, from, subject, user_email, user_password, admin_role } = req.body;

    // Create a nodemailer transporter
    let transporter = nodemailer.createTransport({
        host: "smtp.elasticemail.com",
        port: 2525,
        auth: {
            user: "support@hairbytimablaq.com",
            pass: "BE7BB8AA3222B7E25C81666CB32F01882134",
        },
    });

    // Render the email template with the data
    let html = await ejs.renderFile(path.join(__dirname, 'new-moderator.ejs'), {
        userEmail: user_email,
        userPassword: user_password,
        adminRole: admin_role,
    });

    // Define the email message
    let message = {
        from: from,
        to: to,
        subject: subject,
        html: html,
    };

    try {
        // Send email
        await transporter.sendMail(message);
        res.status(200).json({ message: 'Email sent successfully' });
        console.log("email sent");
    } catch (error) {
        console.error(error);
        console.log(error);
        res.status(500).json({ message: 'Failed to send email' });
    }

});



app.use("/", router);
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});