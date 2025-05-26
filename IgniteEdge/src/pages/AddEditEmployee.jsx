"use client"

import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { employeeService } from "../services/api"
import styles from "./EmployeeForm.module.css"

const AddEditEmployee = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [profileImage, setProfileImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    dob: "",
    role: "",
    department: "",
    employmentType: "",
    salary: "",
    reportingManager: "",
    panNumber: "",
    ifscCode: "",
    bankAccountNumber: "",
    status: "Active",
  })

  useEffect(() => {
    if (id) {
      fetchEmployee()
    }
  }, [id])

  const fetchEmployee = async () => {
    try {
      setLoading(true)
      const data = await employeeService.getById(id)

      // Format date for input field
      if (data.dob) {
        const date = new Date(data.dob)
        data.dob = date.toISOString().split("T")[0]
      }

      if (data.dateJoined) {
        const date = new Date(data.dateJoined)
        data.dateJoined = date.toISOString().split("T")[0]
      }

      setEmployee(data)

      if (data.profileImage) {
        setImagePreview(`http://localhost:5000/uploads/${data.profileImage}`)
      }

      setError(null)
    } catch (err) {
      setError("Failed to fetch employee details. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEmployee({ ...employee, [name]: value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(file)

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      // Create a copy of employee data for submission
      const employeeData = { ...employee }

      // Add profile image if selected
      if (profileImage) {
        employeeData.profileImage = profileImage
      }

      if (id) {
        await employeeService.update(id, employeeData)
      } else {
        await employeeService.create(employeeData)
      }

      navigate("/", { state: { refresh: true } })
    } catch (err) {
      setError("Failed to save employee. Please check your inputs and try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading && id) {
    return <div className="container text-center p-5">Loading employee details...</div>
  }

  return (
    <div className="container">
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h1>{id ? "Edit Employee" : "Add New Employee"}</h1>
          <Link to="../EmployeeList" className={styles.backButton}>
            Back to List
          </Link>
        </div>

        {error && (
          <div
            className="p-3 mb-3"
            style={{ backgroundColor: "rgba(244, 67, 54, 0.1)", color: "var(--error-color)", borderRadius: "4px" }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form} encType="multipart/form-data">
          {/* Personal Information */}
          <div className={styles.formGroup}>
            <label className={`form-label ${styles.required}`}>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={employee.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={`form-label ${styles.required}`}>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={employee.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className="form-label">Phone</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              value={employee.phone || ""}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label className="form-label">Gender</label>
            <select name="gender" className="form-control" value={employee.gender || ""} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className="form-label">Date of Birth</label>
            <input type="date" name="dob" className="form-control" value={employee.dob || ""} onChange={handleChange} />
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className="form-label">Address</label>
            <input
              type="text"
              name="address"
              className="form-control"
              value={employee.address || ""}
              onChange={handleChange}
            />
          </div>

          {/* Employment Information */}
          <div className={styles.formGroup}>
            <label className="form-label">Department</label>
            <input
              type="text"
              name="department"
              className="form-control"
              value={employee.department || ""}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label className="form-label">Role</label>
            <input
              type="text"
              name="role"
              className="form-control"
              value={employee.role || ""}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label className="form-label">Employment Type</label>
            <select
              name="employmentType"
              className="form-control"
              value={employee.employmentType || ""}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contractual">Contractual</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className="form-label">Reporting Manager</label>
            <input
              type="text"
              name="reportingManager"
              className="form-control"
              value={employee.reportingManager || ""}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label className="form-label">Salary</label>
            <input
              type="number"
              name="salary"
              className="form-control"
              value={employee.salary || ""}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label className="form-label">Status</label>
            <select name="status" className="form-control" value={employee.status || "Active"} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Financial Information */}
          <div className={styles.formGroup}>
            <label className="form-label">Bank Account Number</label>
            <input
              type="text"
              name="bankAccountNumber"
              className="form-control"
              value={employee.bankAccountNumber || ""}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label className="form-label">IFSC Code</label>
            <input
              type="text"
              name="ifscCode"
              className="form-control"
              value={employee.ifscCode || ""}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label className="form-label">PAN Number</label>
            <input
              type="text"
              name="panNumber"
              className="form-control"
              value={employee.panNumber || ""}
              onChange={handleChange}
            />
          </div>

          {/* Profile Image */}
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className="form-label">Profile Image</label>
            <div className={styles.imageUpload}>
              {imagePreview && (
                <img src={imagePreview || "/placeholder.svg"} alt="Profile Preview" className={styles.imagePreview} />
              )}
              <input
                type="file"
                name="profileImage"
                className="form-control"
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className={styles.formActions}>
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/")}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Saving..." : id ? "Update Employee" : "Add Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEditEmployee
