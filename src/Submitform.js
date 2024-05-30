import './Submitform.css';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { FormContext } from './Contexts/FormContext';

function Submitform() {
  const {submitFormData, setSubmitFormData} = useContext(FormContext);
  const [formData, setFormData] = useState({
    surveyNumber:'',
    width: '',
    length: '',
    price: '',
    facing: '',
    locationLink: '',
    agentName: '',
    agentMobile: '',
    description: '',
    propertyPhotos: null,
    propertyLocation: {lat:'',lng:''},
  });
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if(formData.propertyLocation == null){
      alert('Please Select the site location!!')
      return;
    }
    try {
      formData.propertyLocation.lat = formData.propertyLocation.lat.toString()
      formData.propertyLocation.lng = formData.propertyLocation.lng.toString()
      console.log(formData)
      const response = await axios.post('http://localhost:4000/api/formdata/submitform', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleSelectLocation = ()=>{
    setSubmitFormData(formData);
    navigate('/map');
  }

  useEffect(()=>{
    setFormData(submitFormData);
  },[])

  return (
    <div className="submit-form">
      <h2>Property Input Data Form</h2>
      <p>List Your Property with us and Enhance Your Sales Leads with our Agents</p>

      <form onSubmit={handleSubmit}>
      <label>
          Survey Number *
          <input
            type="text"
            name="surveyNumber"
            value={formData.surveyNumber}
            onChange={(e) => setFormData({ ...formData, surveyNumber: e.target.value })}
            required
          />
        </label>

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
            required
          >
            <option defaultChecked disabled value="">Choose Facing</option>
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
            required
          />
        </label>

        <label>
          Agent (Mobile Number)
          <input
            type="text"
            name="agentMobile"
            value={formData.agentMobile}
            onChange={(e) => setFormData({ ...formData, agentMobile: e.target.value })}
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
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

        <label>
          {/* Select  Location on Map */}
          <button className='btn bg-info px-2' onClick={handleSelectLocation}>Select Location</button>
          {/* <input
            type="file"
            name="propertyPhotos"
            onChange={(e) => setFormData({ ...formData, propertyPhotos: e.target.files[0] })}
          /> */}
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Submitform;
