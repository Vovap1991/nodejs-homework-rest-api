const Contact = require("../../models/contact");

async function getContacts(req, res, next) {
  try {
    const contacts = await Contact.find().exec();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = getContacts;
