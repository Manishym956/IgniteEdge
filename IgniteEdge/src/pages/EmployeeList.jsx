"use client"

import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { employeeService } from "../services/api"
import styles from "./EmployeeList.module.css"

const EmployeeList = () => {
  const [employees, setEmployees] = useState([])
  const [filteredEmployees, setFilteredEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [searchParams, setSearchParams] = useState({
    name: '',
    department: '',
    position: '',
    status: ''
  })
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.state?.refresh) {
      setRefreshKey(prev => prev + 1)
      // Clear the state after using it
      window.history.replaceState({}, document.title)
    }
  }, [location])

  useEffect(() => {
    fetchEmployees()
  }, [refreshKey])

  const fetchEmployees = async () => {
    try {
      setLoading(true)
      const data = await employeeService.getAll()
      setEmployees(data)
      setFilteredEmployees(data)
      setError(null)
    } catch (err) {
      setError("Failed to fetch employees. Please try again later.")
      console.error("Error fetching employees:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    const filtered = employees.filter(employee => {
      return (
        (searchParams.name === '' || 
          employee.name.toLowerCase().includes(searchParams.name.toLowerCase())) &&
        (searchParams.department === '' || 
          employee.department.toLowerCase().includes(searchParams.department.toLowerCase())) &&
        (searchParams.position === '' || 
          employee.position.toLowerCase().includes(searchParams.position.toLowerCase())) &&
        (searchParams.status === '' || 
          employee.status === searchParams.status)
      )
    })
    setFilteredEmployees(filtered)
  }

  const handleClear = () => {
    setSearchParams({
      name: '',
      department: '',
      position: '',
      status: ''
    })
    setFilteredEmployees(employees)
  }

  const handleInputChange = (field, value) => {
    const newParams = { ...searchParams, [field]: value }
    setSearchParams(newParams)
    
    // Auto-filter as user types
    const filtered = employees.filter(employee => {
      return (
        (newParams.name === '' || 
          employee.name.toLowerCase().includes(newParams.name.toLowerCase())) &&
        (newParams.department === '' || 
          employee.department.toLowerCase().includes(newParams.department.toLowerCase())) &&
        (newParams.position === '' || 
          employee.position.toLowerCase().includes(newParams.position.toLowerCase())) &&
        (newParams.status === '' || 
          employee.status === newParams.status)
      )
    })
    setFilteredEmployees(filtered)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await employeeService.delete(id)
        setEmployees(prev => prev.filter(emp => emp._id !== id))
        setFilteredEmployees(prev => prev.filter(emp => emp._id !== id))
      } catch (err) {
        console.error("Error deleting employee:", err)
        alert("Failed to delete employee. Please try again.")
      }
    }
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
      </div>
    )
  }

  if (error) {
    return <div className={styles.error}>{error}</div>
  }

  return (
    <div className={styles.employeeList}>
      <div className={styles.topBar}>
        <button className={styles.backButton} onClick={() => navigate('/Dashboard')}>
          Back to Dashboard
        </button>
        <h2 className={styles.pageTitle}>Employee List</h2>
        <Link to="/add" className={styles.addButton}>
          Add New Employee
        </Link>
      </div>
      
      {/* Simple Search Panel without icons */}
      <div className={styles.searchPanelWrapper}>
        <h3 className={styles.searchPanelHeading}>Search Employees</h3>
        <div className={styles.searchForm}>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchParams.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={styles.searchInput}
          />
          <input
            type="text"
            placeholder="Department..."
            value={searchParams.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
            className={styles.searchInput}
          />
          <input
            type="text"
            placeholder="Position..."
            value={searchParams.position}
            onChange={(e) => handleInputChange('position', e.target.value)}
            className={styles.searchInput}
          />
          <select
            value={searchParams.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className={styles.searchSelect}
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button onClick={handleClear} className={styles.clearButton}>
            Clear
          </button>
        </div>
      </div>
      
      {filteredEmployees.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No employees found matching your search criteria.</p>
        </div>
      ) : (
        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Position</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.name}</td>
                  <td>{employee.department}</td>
                  <td>{employee.position}</td>
                  <td>
                    <span className={`${styles.status} ${styles[employee.status.toLowerCase()]}`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className={styles.actions}>
                    <Link
                      to={`/edit/${employee._id}`}
                      className={styles['btn-primary']}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(employee._id)}
                      className={styles['btn-danger']}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default EmployeeList