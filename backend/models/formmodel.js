const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formSchema = new Schema({

  surveyNumber: {
    type: String,
    required: true
  },

  width: {
    type: String,
    required: true
  },
  length: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  facing: {
    type: String,
    enum: ['north', 'south', 'east', 'west', 'north east', 'north west', 'south east', 'south west'],
    default: ''
  },
  agentName: {
    type: String,
    default: ''
  },
  agentMobile: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  propertyPhotos: {
    type: Object,
    default: null
  },
  propertyLocation: {
    type: {lat: String, lng: String},
    required:true
  }
}, {
  timestamps: true
});
 
module.exports = mongoose.model('property_details', formSchema);
