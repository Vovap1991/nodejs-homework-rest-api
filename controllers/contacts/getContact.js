const Contact = require("../../models/contact");

async function getContact(req, res, next) {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId).exec();

    if (contact === null) {
      return res.status(404).json({ message: "Not found" });
    }

    console.log(contact.owner.toString(), req.user.id);

    if (contact.owner.toString() !== req.user.id) {
      return res.status(404).json({ message: "Contact is not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = getContact;
