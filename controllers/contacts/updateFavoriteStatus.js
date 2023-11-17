const Contact = require("../../models/contact");
const Joi = require("joi");

const { updateFavoriteSchema } = require("../../validation/contacts");

async function updateStatusContact(req, res, next) {
  const { contactId } = req.params;

  const contact = {
    favorite: req.body.favorite,
  };

  const response = updateFavoriteSchema(contact);

  if (typeof response.error !== "undefined") {
    return res.status(400).json({ message: "missing field favorite" });
  }

  try {
    const result = await Contact.findByIdAndUpdate(contactId, contact, {
      new: true,
    });

    if (result === null) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = updateStatusContact;
