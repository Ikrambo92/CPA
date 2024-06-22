const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const nodemailer = require('nodemailer')
require('dotenv').config();
const multer = require('multer')
const fs = require('fs')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/public')))

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.get('/', (req, res) => {
    res.render('home.ejs');
})

app.get('/services', (req, res) => {
    res.render('services.ejs');
})

app.get('/contact-us', (req, res) => {
    res.render('contact.ejs');
})

app.get('/thanks', (req, res) => {
    res.render('thanks.ejs');
})


// Setting up the transporter with Livemail SMTP settings
const transporter = nodemailer.createTransport({
    host: 'smtp.livemail.co.uk', // Livemail SMTP server
    port: 587,                   // Livemail SMTP port
    secure: false,               // Use TLS (false for port 587)
    auth: {
        user: 'Ikram@cpa-ltd.co.uk', // Replace with your Livemail email
        pass: 'BusinessRates123'     // Replace with your Livemail email password
    }
});

const upload = multer({ dest: 'uploads/' });

app.post('/success', upload.single('attachment'), (req, res) => {
    if (!req.file || req.file.error) {
        return res.status(400).send('Error Uploading file.');
    }

    // Email options
    const mailOptions = {
        from: 'Ikram@cpa-ltd.co.uk',
        to: 'ahmeduzman24@gmail.com',
        text: req.body.message,
        attachments: [
            {
                filename: req.file.originalname,
                path: req.file.path
            }
        ]
    };

    // Sending the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error sending email.');
        }

        // Clean up uploaded file after successful email sending (optional)
        const filePath = req.file.path;
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting uploaded file:', err);
            }
        });

        res.render('submission.ejs');
    });
});

app.post('/submission', async (req, res) => {
    const mailOptions = {
        from: 'Ikram@cpa-ltd.co.uk',
        to: 'ahmeduzman24@gmail.com',
        subject: req.body.subject,
        text: `Email from: ${req.body.email}, \n \n ${req.body.message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.render('submission.ejs');
    });
});




app.listen(port, () => console.log(`Listening on port ${port}!`));

