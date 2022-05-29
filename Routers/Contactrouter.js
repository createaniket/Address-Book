const express = require("express");
const Contact = require("../Models/Contacts");
var jwt = require("jsonwebtoken");
const Auth = require("../Auth/Auth");
const router = new express.Router();
// to Add single Contact
router.post("/AddOne", Auth, async (req, res) => {
  const contact = new Contact({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await contact.save();
    res.status(201).send(contact);
  } catch (e) {
    res.status(400).send(e);
  }
});
// to Add contacts in bulk
router.post("/saveMany", Auth, async (req, res) => {
  try {
    for (let i = 0; i < req.body.contact.length; i++) {
      const contacts = new Contact(req.body.contact[i]);
      await contacts.save();
    }
    res.status(201).send(req.body.contact);
  } catch (e) {
    res.status(400).send(e);
  }
});
// fetching phase matching result
router.get("/readAllContact", Auth, async (req, res) => {
  try {
    await req.user.populate({
      path: "contacts",
      options: {
        limit: parseInt(2), // pagination for each page two contacts
      },
    });
    res.send(req.user.contacts);
  } catch (e) {
    res.status(400).send(e);
  }
});
// Fetching a single contact by its Name
router.get("/readoneContact", Auth, async (req, res) => {
  try {
    const contacts = await Contact.findOne({ owner: req.user._id });
    res.send(contacts);
  } catch (e) {
    res.status(400).send(e);
  }
});
// to Update the given Contact
router.patch("/Update/:id", Auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "phonenumber"];
  const isvalidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isvalidUpdate) {
    res.status(400).send({ Error: "not a valid Update" });
  }
  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!contact) {
      return res.status(404).send(e);
    }
    updates.forEach((update) => (contact[update] = req.body[update]));
    await contact.save();
    res.status(201).send(contact);
  } catch (e) {
    res.status(400).send();
  }
});
// to delete given Contact
router.delete("/Delete/:id", Auth, async (req, res) => {
  const deletecontact = await Contact.findOneAndDelete({
    _id: req.params.id,
    owner: req.user._id,
  });
  try {
    if (!deletecontact) {
      res.status(404).send("Contact not found");
    }
    res.status(201).send(deletecontact);
  } catch (e) {
    res.status(500).send(e);
  }
});
module.exports = router;