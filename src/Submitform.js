import React, { useState } from 'react';
import './Submitform.css';
import axios from 'axios';

function Submitform() {
  const [formData, setFormData] = useState({
    width: '',
    length: '',
    price: '',
    facing: '',
    locationLink: '',
    agentName: '',
    agentMobile: '',
    description: '',
    propertyPhotos: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post('http://localhost:4000/api/formdata/submitform', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Form submitted successfully:', response.data);
      // Handle success (e.g., show a success message, reset form, etc.)
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="submit-form">
      <h2>Property Input Data Form</h2>
      <p>List Your Property with us and Enhance Your Sales Leads with our Agents</p>

      <form onSubmit={handleSubmit}>
        <label>
          Width *
          <input
            type="text"
            name="width"
            value={formData.width}
            onChange={(e) => setFormData({ ...formData, width: e.target.value })}
            required
          />
        </label>

        <label>
          Length *
          <input
            type="text"
            name="length"
            value={formData.length}
            onChange={(e) => setFormData({ ...formData, length: e.target.value })}
            required
          />
        </label>

        <label>
          Price *
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
        </label>

        <label>
          Facing
          <select
            name="facing"
            value={formData.facing}
            onChange={(e) => setFormData({ ...formData, facing: e.target.value })}
          >
            <option value="">Choose</option>
            <option value="north">North</option>
            <option value="south">South</option>
            <option value="east">East</option>
            <option value="west">West</option>
            <option value="north east">North East</option>
            <option value="north west">North West</option>
            <option value="south east">South East</option>
            <option value="south west">South West</option>
          </select>
        </label>

        <label>
          Location Link *
          <input
            type="text"
            name="locationLink"
            value={formData.locationLink}
            onChange={(e) => setFormData({ ...formData, locationLink: e.target.value })}
            required
          />
        </label>

        <label>
          Agent Name
          <input
            type="text"
            name="agentName"
            value={formData.agentName}
            onChange={(e) => setFormData({ ...formData, agentName: e.target.value })}
          />
        </label>

        <label>
          Agent (Mobile Number)
          <input
            type="text"
            name="agentMobile"
            value={formData.agentMobile}
            onChange={(e) => setFormData({ ...formData, agentMobile: e.target.value })}
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          ></textarea>
        </label>

        <label>
          Property Photos
          <input
            type="file"
            name="propertyPhotos"
            onChange={(e) => setFormData({ ...formData, propertyPhotos: e.target.files[0] })}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Submitform;
