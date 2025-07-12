import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [formData, setFormData] = useState({
    siteName: '',
    siteDescription: '',
    supportEmail: '',
    contactPhone: '',
    twitterUrl: '',
    facebookUrl: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <div className="settings">
      <h2>General Settings</h2>
      
      <form onSubmit={handleSubmit} className="settings-form">
        <div className="form-section">
          <h3>Site Information</h3>
          
          <div className="form-group">
            <label htmlFor="siteName">Site Name</label>
            <input
              type="text"
              id="siteName"
              name="siteName"
              value={formData.siteName}
              onChange={handleInputChange}
              placeholder="Enter site name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="siteDescription">Site Description</label>
            <textarea
              id="siteDescription"
              name="siteDescription"
              value={formData.siteDescription}
              onChange={handleInputChange}
              placeholder="Enter site description"
              rows="4"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Contact Information</h3>
          
          <div className="form-group">
            <label htmlFor="supportEmail">Support Email</label>
            <input
              type="email"
              id="supportEmail"
              name="supportEmail"
              value={formData.supportEmail}
              onChange={handleInputChange}
              placeholder="Enter support email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="contactPhone">Contact Phone</label>
            <input
              type="tel"
              id="contactPhone"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleInputChange}
              placeholder="Enter contact phone"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Social Media</h3>
          
          <div className="form-group">
            <label htmlFor="twitterUrl">Twitter URL</label>
            <input
              type="url"
              id="twitterUrl"
              name="twitterUrl"
              value={formData.twitterUrl}
              onChange={handleInputChange}
              placeholder="Enter Twitter URL"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="facebookUrl">Facebook URL</label>
            <input
              type="url"
              id="facebookUrl"
              name="facebookUrl"
              value={formData.facebookUrl}
              onChange={handleInputChange}
              placeholder="Enter Facebook URL"
            />
          </div>
        </div>

        <button type="submit" className="save-btn">Save Changes</button>
      </form>
    </div>
  );
};

export default Settings;
