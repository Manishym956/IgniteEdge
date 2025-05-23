import Employee from "../models/Employee.js";
import fs from "fs";
import path from "path";

// Helper function to handle errors
const handleError = (res, err, statusCode = 500) => {
  console.error("Error:", err.message)
  return res.status(statusCode).json({ error: err.message })
}

// Create
export const createEmployee = async (req, res) => {
  try {
    const data = req.body

    // Handle date fields
    if (data.dob) data.dob = new Date(data.dob)
    if (data.dateJoined) data.dateJoined = new Date(data.dateJoined)

    // Handle file upload
    if (req.file) {
      data.profileImage = req.file.filename
    }

    const employee = new Employee(data)
    await employee.save()
    res.status(201).json(employee)
  } catch (err) {
    handleError(res, err, 400)
  }
}

// Read All
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 })
    res.json(employees)
  } catch (err) {
    handleError(res, err)
  }
}

// Read One
export const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
    if (!employee) return res.status(404).json({ message: "Employee not found" })
    res.json(employee)
  } catch (err) {
    handleError(res, err)
  }
}

// Update
export const updateEmployee = async (req, res) => {
  try {
    const data = req.body

    // Handle date fields
    if (data.dob) data.dob = new Date(data.dob)
    if (data.dateJoined) data.dateJoined = new Date(data.dateJoined)

    // Handle file upload
    if (req.file) {
      // Delete old image if exists
      const employee = await Employee.findById(req.params.id)
      if (employee && employee.profileImage) {
        const oldImagePath = path.join(__dirname, "../uploads", employee.profileImage)
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath)
        }
      }
      data.profileImage = req.file.filename
    }

    const employee = await Employee.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true })

    if (!employee) return res.status(404).json({ message: "Employee not found" })
    res.json(employee)
  } catch (err) {
    handleError(res, err, 400)
  }
}

// Delete
export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)

    if (!employee) return res.status(404).json({ message: "Employee not found" })

    // Delete profile image if exists
    if (employee.profileImage) {
      const imagePath = path.join(__dirname, "../uploads", employee.profileImage)
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath)
      }
    }

    await Employee.findByIdAndDelete(req.params.id)
    res.json({ message: "Employee deleted successfully" })
  } catch (err) {
    handleError(res, err)
  }
}
