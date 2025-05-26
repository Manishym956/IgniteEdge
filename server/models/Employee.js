import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    phone: { type: String, trim: true },
    address: { type: String, trim: true },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    dob: Date,
    profileImage: String,
    role: { type: String, trim: true },
    department: { type: String, trim: true },
    employmentType: { type: String, enum: ["Full-Time", "Part-Time", "Contractual"] },
    reportingManager: { type: String, trim: true },
    dateJoined: Date,
    salary: { type: Number, min: 0 },
    bankAccountNumber: { type: String, trim: true },
    ifscCode: { type: String, trim: true },
    panNumber: { type: String, trim: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true },
);

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
