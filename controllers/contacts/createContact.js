const contact = require("../../models/contact");
const Contact = require("../../models/contact");

const { validateContact } = require("../../validation/contacts");

async function createContact(req, res, next) {
  const contact = { ...req.body, owner: req.user.id.toString() };

  const response = validateContact(contact);
  console.log(response);

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
