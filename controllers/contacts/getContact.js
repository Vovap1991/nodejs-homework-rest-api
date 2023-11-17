const Contact = require("../../models/contact");

async function getContact(req, res, next) {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId).exec();

    if (contact === null) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.status(200).json(contact);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = getContact;
