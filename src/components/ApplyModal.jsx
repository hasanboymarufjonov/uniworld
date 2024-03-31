import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../config";

function ApplyModal({ isOpen, onClose, universityId, courseId }) {
  const [formData, setFormData] = useState({
    university: universityId,
    course: courseId,
    first_name: "",
    last_name: "",
    age: "",
    phone_number: "",
    email: "",
    gender: "",
    region: null,
  });

  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/common/regions/`);
        setRegions(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching regions:", error);
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/applications/create/`, formData);
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="bg-white w-96 mx-auto p-4 rounded-lg shadow-lg z-50 relative">
        <button className="absolute top-4 right-4" onClick={onClose}>
          <svg
            className="w-6 h-6 text-gray-900 cursor-pointer"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <h2 className="text-xl font-semibold mb-4">Apply to Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full px-3 py-2 rounded border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full px-3 py-2 rounded border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              className="w-full px-3 py-2 rounded border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full px-3 py-2 rounded border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-3 py-2 rounded border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="mb-4">
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            >
              <option value="">Select Region</option>
              {regions.map((region) => (
                <option key={region.id} value={region.name}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-indigo-600"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}

export default ApplyModal;
