import React, { useState } from "react";
import axios from "axios";

export function PaintingsNew() {
  const [errors, setErrors] = useState([]);
  const [imageUrls, setImageUrls] = useState([""]); // State to hold image URLs
  const [upload1, setUpload1] = useState(null);
  const [upload2, setUpload2] = useState(null);
  const [upload3, setUpload3] = useState(null);
  const handleSetFile1 = (event) => {
    console.log("event", event);
    if (event.target.files.length > 0) {
      setUpload1(event.target.files[0]);
    }
  };
  const handleSetFile2 = (event) => {
    console.log("event", event);
    if (event.target.files.length > 0) {
      setUpload2(event.target.files[0]);
    }
  };
  const handleSetFile3 = (event) => {
    console.log("event", event);
    if (event.target.files.length > 0) {
      setUpload3(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("upload1", upload1);
      formData.append("upload2", upload2);
      formData.append("upload3", upload3);
      formData.append("description", event.target.description.value);

      // Append non-empty image URLs to FormData
      imageUrls.forEach((url, index) => {
        if (url.trim() !== "") {
          // Check if the URL is not empty or contains only whitespace
          formData.append(`url${index + 1}`, url); // Adjust index to start from 1
        }
      });

      const response = await axios.post("/paintings.json", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);
      event.target.reset();
      window.location.href = "/admin-page";
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.errors || ["An error occurred."];
      setErrors(errorMessage);
    }
  };

  const handleCancel = () => {
    window.location.href = "/admin-page";
  };

  return (
    <section>
      <div id="new">
        <div></div>
        <div className="container">
          <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0 mt-5">
            Create a new painting
          </h2>
          <div className="divider-custom">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon">
              <i className="fas fa-star"></i>
            </div>
            <div className="divider-custom-line"></div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8 col-xl-7">
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="name"
                    type="text"
                    placeholder="Enter description..."
                    data-sb-validations="required"
                    name="description"
                  />
                  <label htmlFor="name">Description</label>
                  <div className="invalid-feedback" data-sb-feedback="name:required">
                    A description is required.
                  </div>
                </div>
                <div className="mt-4">
                  Upload Image: <input type="file" onChange={handleSetFile1} />
                </div>
                <div className="mt-4">
                  Upload Image: <input type="file" onChange={handleSetFile2} />
                </div>
                <div className="mt-4">
                  Upload Image: <input type="file" onChange={handleSetFile3} />
                </div>
                <button type="button" className="btn btn-outline-dark mt-4" onClick={handleCancel}>
                  Cancel
                </button>{" "}
                <div>
                  {errors.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
                <div className="pt-3">
                  <button type="submit" className="btn btn-outline-success mt-auto">
                    Add New Painting
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
