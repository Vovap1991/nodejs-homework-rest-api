const Contact = require("../../models/contact");

async function getContacts(req, res, next) {
  try {
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;

    const query = { owner: req.user.id };

    if (favorite !== undefined) {
      query.favorite = favorite === "true";
    }

    const contacts = await Contact.find(query, " ", {
      skip,
      limit: Number(limit),
    }).exec();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = getContacts;
