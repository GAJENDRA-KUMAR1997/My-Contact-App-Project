const express = require("express");

const router = express.Router();

const {getContact,getContactById,createContact,updateContact,deleteContact} = require("../Controller/contactController");
const validateToken = require("../Middleware/validateTokenHandler");

router.use(validateToken);

router.route("/").get(getContact).post(createContact);

router.route("/:id").get(getContactById).put(updateContact).delete(deleteContact);

module.exports = router;