const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formSchema = new Schema({
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
  locationLink: {
    type: String,
    required: true
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
    type: String,
    default: '' // Adjust this according to how you plan to store the file (e.g., URL to the file)
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Form', formSchema);
