const Form = require('../models/formmodel');
const mongoose = require('mongoose');

// Add form data
const addFormdata = async (req, res) => {
  try {
    console.log(req.body);
    const formData = new Form({
      width: req.body.width,
      length: req.body.length,
      price: req.body.price,
      facing: req.body.facing,
      locationLink: req.body.locationLink,
      agentName: req.body.agentName,
      agentMobile: req.body.agentMobile,
      description: req.body.description,
      propertyPhotos: req.body.propertyPhotos
    });

    const result = await formData.save();
    res.status(201).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding form data', error: err });
  }
};

module.exports = { addFormdata };
