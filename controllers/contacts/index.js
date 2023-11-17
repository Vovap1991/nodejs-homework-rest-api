const getContacts = require("./getContacts");

const getContact = require("./getContact");

const createContact = require("./createContact");

const updateContact = require("./updateContact");

const updateStatusContact = require("./updateFavoriteStatus");

const deleteContact = require("./deleteContact");

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  updateStatusContact,
  deleteContact,
};
