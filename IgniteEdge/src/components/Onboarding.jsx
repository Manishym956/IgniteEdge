import React, { useState } from 'react';
import './Onboarding.css';
import illustration from './assets/illustration.png';

const OnboardingForm = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedRole, setSelectedRole] = useState('Select Role');
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [errors, setErrors] = useState({});

  const roleOptions = [
    'Select Role',
    'CEO',
    'CTO',
    'CFO',
    'COO',
    'Product Manager',
    'Marketing Manager',
    'Sales Manager',
    'Other'
  ];

  const handleAddTeamMember = () => {
    setTeamMembers([...teamMembers, { name: '', role: '', email: '' }]);
  };

  const handleRemoveTeamMember = (index) => {
    const updatedMembers = [...teamMembers];
    updatedMembers.splice(index, 1);
    setTeamMembers(updatedMembers);
  };

  const handleTeamMemberChange = (index, field, value) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index][field] = value;
    setTeamMembers(updatedMembers);
  };

  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setShowRoleDropdown(false);
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Company Details validation
    if (!document.getElementById('companyName').value.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    if (!document.getElementById('industryType').value.trim()) {
      newErrors.industryType = 'Industry type is required';
    }
    if (!document.getElementById('yearEstablished').value.trim()) {
      newErrors.yearEstablished = 'Year is required';
    }
    if (!document.getElementById('hqLocation').value.trim()) {
      newErrors.hqLocation = 'Location is required';
    }
    if (selectedRole === 'Select Role') {
      newErrors.role = 'Please select a role';
    }

    // Team Members validation
    teamMembers.forEach((member, index) => {
      if (!member.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        newErrors[`team_${index}_email`] = 'Invalid email format';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const formData = {
      companyDetails: {
        name: document.getElementById('companyName').value,
        industry: document.getElementById('industryType').value,
        yearEstablished: document.getElementById('yearEstablished').value,
        location: document.getElementById('hqLocation').value,
        role: selectedRole
      },
      teamMembers,
      financialData: {
        costPerUnit: document.getElementById('costPerUnit').value,
        manufacturing: document.getElementById('manufacturing').value,
        labourCost: document.getElementById('labourCost').value,
        burnRate: document.getElementById('burnRate').value,
        employeeCount: document.getElementById('employeeCount').value
      }
    };

    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      // Handle successful submission
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-content">
        <div className="onboarding-illustration">
          <div className="illustration-container">
            <img 
              src={illustration} 
              alt="Business Insights Illustration" 
              className="illustration-image"
            />
          </div>
          <div className="onboarding-heading">
            <h1>Submit Your<br />Business Insights</h1>
            <p>Help us understand your business better by sharing key metrics and information.</p>
          </div>
        </div>

        <div className="onboarding-form">
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h2>Company Details</h2>
              <div className="form-group">
                <label htmlFor="companyName">Company Name</label>
                <input 
                  type="text" 
                  id="companyName" 
                  name="companyName" 
                  className={errors.companyName ? 'error' : ''}
                />
                {errors.companyName && <span className="error-message">{errors.companyName}</span>}
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <label htmlFor="industryType">Industry Type</label>
                  <input type="text" id="industryType" name="industryType" />
                </div>
                <div className="form-group half">
                  <label htmlFor="yearEstablished">Year Established</label>
                  <input type="text" id="yearEstablished" name="yearEstablished" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <label htmlFor="hqLocation">HQ Location</label>
                  <input type="text" id="hqLocation" name="hqLocation" />
                </div>
                <div className="form-group half">
                  <label htmlFor="roleInCompany">Role in Company</label>
                  <div className="custom-select">
                    <div 
                      className="select-selected" 
                      onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                    >
                      {selectedRole}
                      <span className="dropdown-arrow">▼</span>
                    </div>
                    {showRoleDropdown && (
                      <div className="select-items">
                        {roleOptions.map((role, index) => (
                          <div 
                            key={index} 
                            onClick={() => handleSelectRole(role)}
                            className={selectedRole === role ? 'same-as-selected' : ''}
                          >
                            {role}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2>Team Information</h2>
              <button 
                type="button" 
                className="add-team-member-btn" 
                onClick={handleAddTeamMember}
              >
                + Add Team Member
              </button>

              {teamMembers.map((member, index) => (
                <div key={index} className="team-member">
                  <div className="form-row">
                    <div className="form-group third">
                      <label>Name</label>
                      <input 
                        type="text" 
                        value={member.name} 
                        onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)} 
                      />
                    </div>
                    <div className="form-group third">
                      <label>Role</label>
                      <input 
                        type="text" 
                        value={member.role} 
                        onChange={(e) => handleTeamMemberChange(index, 'role', e.target.value)} 
                      />
                    </div>
                    <div className="form-group third">
                      <label>Email</label>
                      <input 
                        type="email" 
                        value={member.email} 
                        onChange={(e) => handleTeamMemberChange(index, 'email', e.target.value)} 
                      />
                    </div>
                    <button 
                      type="button" 
                      className="remove-btn" 
                      onClick={() => handleRemoveTeamMember(index)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="form-section">
              <h2>Financial Data</h2>
              <div className="form-row">
                <div className="form-group third">
                  <label htmlFor="costPerUnit">Cost per Unit ($)</label>
                  <input type="text" id="costPerUnit" name="costPerUnit" />
                </div>
                <div className="form-group third">
                  <label htmlFor="manufacturing">Manufacturing ($)</label>
                  <input type="text" id="manufacturing" name="manufacturing" />
                </div>
                <div className="form-group third">
                  <label htmlFor="labourCost">Labour Cost ($)</label>
                  <input type="text" id="labourCost" name="labourCost" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <label htmlFor="burnRate">Burn Rate ($)</label>
                  <input type="text" id="burnRate" name="burnRate" />
                </div>
                <div className="form-group half">
                  <label htmlFor="employeeCount">Employee Count</label>
                  <input type="text" id="employeeCount" name="employeeCount" />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;