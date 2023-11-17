const Contact = require("../../models/contact");

async function deleteContact(req, res, next) {
  const { contactId } = req.params;

  try {
    const result = await Contact.findByIdAndDelete(contactId);

    if (result === null) {
      return res.status(404).json({ message: "Not found" });
    }
    res
      .status(200)
      .json({ message: `Contact with id: ${contactId} successfully deleted` });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = deleteContact;
