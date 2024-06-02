const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactsModel");

const getContact = asyncHandler(async(req,res)=>{
    const Contacts = await Contact.find({user_id : req.user.id});
    res.status(200).json(Contacts);
});

const getContactById = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        req.status(400);
        throw new Error("Contact Not Found");
    }
    res.status(200).json(contact);
});

const createContact = asyncHandler(async(req,res)=>{
    console.log(req.body);
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact = await Contact.create({
        name,email,phone,user_id : req.user.id
    })
    res.status(200).json(contact);
})

const updateContact  = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        req.status(400);
        throw new Error("Contact Not Found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update contacts");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    )
    res.status(200).json(updateContact);
});

const deleteContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        req.status(400);
        throw new Error("Contact Not Found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to delete contacts");
    } 
    await Contact.deleteOne({_id : req.params.id});
    res.status(200).json(contact);
});

module.exports = {getContact,getContactById,createContact,updateContact,deleteContact}