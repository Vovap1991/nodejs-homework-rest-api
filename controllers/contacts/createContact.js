const contact = require("../../models/contact");
const Contact = require("../../models/contact");

const { validateContact } = require("../../validation/contacts");

async function createContact(req, res, next) {
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
    owner: req.user.id,
  };

  const response = validateContact(contact);

  if (typeof response.error !== "undefined") {
    return res.status(400).json({ message: "missing required name field" });
  }

  try {
    const result = await Contact.create(contact);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = createContact;
