import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const SocialMediaForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
    imageUrl: "",
  });
  const [redirect, setRedirect] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let hasError = false;
    if (formData.name.trim() === "") {
      alert("Error: Name cannot be empty.");
      console.error("Error: Name cannot be empty.");
      hasError = true;
    }
    if (formData.url.trim() === "") {
      alert("Error: URL cannot be empty.");
      console.error("Error: URL cannot be empty.");
      hasError = true;
    }
    if (formData.description.trim() === "") {
      alert("Error: Description cannot be empty.");
      console.error("Error: Description cannot be empty.");
      hasError = true;
    }
    if (formData.imageUrl.trim() === "") {
      alert("Error: Image URL cannot be empty.");
      console.error("Error: Image URL cannot be empty.");
      hasError = true;
    }
    if (!hasError) {
      const response = await fetch("/api/v1/websites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormData({
          name: "",
          url: "",
          description: "",
          imageUrl: "",
        });
        setRedirect(true);
      } else {
        console.error("Failed to add social media:", response.statusText);
      }
    }
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h5 className="form-title">Add A New Social Site For People To Review</h5>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="imageUrl">Image Logo URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="url">Website URL</label>
        <input
          type="text"
          id="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
  );
};

export default SocialMediaForm;