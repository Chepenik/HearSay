import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const SocialMediaForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState({});
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
    let submitErrors = {};
    if (formData.name.trim() === "") {
      submitErrors = {
        ...submitErrors,
        name: "cannot be empty",
      };
    }
    if (formData.url.trim() === "") {
      submitErrors = {
        ...submitErrors,
        url: "cannot be empty",
      };
    }
    if (formData.description.trim() === "") {
      submitErrors = {
        ...submitErrors,
        description: "cannot be empty",
      };
    }
    if (formData.imageUrl.trim() === "") {
      submitErrors = {
        ...submitErrors,
        imageUrl: "cannot be empty",
      };
    }

    setErrors(submitErrors);
    setServerErrors({});

    if (Object.keys(submitErrors).length === 0) {
      try {
        const response = await fetch("/api/v1/websites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          setRedirect(true);
        } else {
          const errorMessage = await response.text();
          setServerErrors({ message: errorMessage });
        }
      } catch (error) {
        setServerErrors({ message: error.message });
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
        {errors.name && <p className="error">{`Name ${errors.name}`}</p>}
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
        {errors.imageUrl && <p className="error">{`Image URL ${errors.imageUrl}`}</p>}
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
        {errors.url && <p className="error">{`URL ${errors.url}`}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && <p className="error">{`Description ${errors.description}`}</p>}
      </div>
      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
  );
};

export default SocialMediaForm;