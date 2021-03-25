require('../DATA/database');
const nodemailer = require('nodemailer')
var express = require('express');
var router = express.Router();
const contactModel = require("../MODELS/contact");


router.post('/', async (req, res) => {
    try {
        const contact = new contactModel({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        })
        await contact.save();
        let testAccount = await nodemailer.createTestAccount();
        let userGmail = 'taliahakim63@gmail.com' 
        let userPass = '' 
        if (userGmail && userPass) {
            let transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: userGmail, 
                    pass: userPass
                },
            });
            let info = await transporter.sendMail({
                from: `${req.body.name} ${req.body.email}`, 
                to: userGmail, 
                subject: "You have recieved a message request ✔",
                text: req.body.message, 
            });
            console.log("Message sent: %s", info.messageId);
        }
        res.status(200).send(contact)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
});

module.exports = router;