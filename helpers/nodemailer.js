require("dotenv").config();

const nodemailre = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

const message = {
  to: process.env.EMAIL_ADDRESS,
  from: process.env.EMAIL_ADDRESS,
  subject: "Test email from Vova",
  html: "<h1>This is testing email</h1>",
  text: "This is testing email",
};

transport
  .sendMail(message)
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
