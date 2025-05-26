import React, { useState } from 'react';
import axios from 'axios';

const EmployeeForm = ({ fetchEmployees }) => {
  const [form, setForm] = useState({});
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach(key => data.append(key, form[key]));
    if (file) data.append("profileImage", file);

    await axios.post("http://localhost:1600/employees", data);
    fetchEmployees();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <input name="salary" type="number" placeholder="Salary" onChange={handleChange} />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default EmployeeForm;
