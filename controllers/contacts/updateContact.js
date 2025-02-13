const Contact = require("../../models/contact");

const { validateContact } = require("../../validation/contacts");

async function updateContact(req, res, next) {
  const { contactId } = req.params;

  const updatedContact = {
    ...req.body,
  };

  const response = validateContact(updatedContact);

  if (typeof response.error !== "undefined") {
    return res.status(400).json({ message: "missing required name field" });
  }

  try {
    const contact = await Contact.findById(contactId);
    console.log(contact);

    if (contact === null) {
      return res.status(404).json({ message: "Not Found" });
    }

    if (contact.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const result = await Contact.findByIdAndUpdate(contactId, updatedContact, {
      new: true,
    });

    if (result === null) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = updateContact;
