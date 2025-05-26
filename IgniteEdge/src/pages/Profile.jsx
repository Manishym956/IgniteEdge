import React, { useState, useEffect } from 'react';

const labelStyle = { fontWeight: 600, marginBottom: 4, display: 'block', color: '#1e293b' };
const inputStyle = { padding: '8px 12px', borderRadius: 4, border: '1px solid #d1d5db', marginBottom: 16, width: '100%' };
const cardStyle = {
  background: '#fff',
  borderRadius: 16,
  boxShadow: '0 4px 24px rgba(30,41,59,0.10)',
  padding: 32,
  maxWidth: 700,
  margin: '40px auto',
};
const buttonStyle = {
  background: 'linear-gradient(90deg, #6366f1 0%, #2563eb 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: 6,
  padding: '10px 28px',
  fontWeight: 600,
  cursor: 'pointer',
  marginRight: 12,
  marginTop: 8,
  boxShadow: '0 2px 8px rgba(99,102,241,0.10)'
};
const cancelButtonStyle = {
  ...buttonStyle,
  background: '#64748b',
  boxShadow: 'none',
};
const tabStyle = (active) => ({
  padding: '12px 32px',
  border: 'none',
  borderBottom: active ? '3px solid #6366f1' : '3px solid transparent',
  background: 'none',
  color: active ? '#1e293b' : '#64748b',
  fontWeight: active ? 700 : 500,
  fontSize: 18,
  cursor: 'pointer',
  outline: 'none',
  transition: 'color 0.2s, border-bottom 0.2s',
});
const tabPanelStyle = { padding: '32px 0 0 0' };

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('company');
  const [data, setData] = useState({
    companyName: '',
    industryType: '',
    yearEstablished: '',
    hqLocation: '',
    roleInCompany: '',
    teamMembers: [],
    costPerUnit: '',
    manufacturing: '',
    labourCost: '',
    burnRate: '',
    employeeCount: '',
  });

  useEffect(() => {
    const stored = localStorage.getItem('onboardingData');
    if (stored) setData(JSON.parse(stored));
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleTeamMemberChange = (idx, field, value) => {
    const updated = [...data.teamMembers];
    updated[idx][field] = value;
    setData({ ...data, teamMembers: updated });
  };

  const handleSave = () => {
    localStorage.setItem('onboardingData', JSON.stringify(data));
    setEditing(false);
  };

  return (
    <div style={cardStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: 32, color: '#1e293b', letterSpacing: 1 }}>Profile</h2>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        {editing ? (
          <>
            <button style={buttonStyle} onClick={handleSave}>Save</button>
            <button style={cancelButtonStyle} onClick={() => setEditing(false)}>Cancel</button>
          </>
        ) : (
          <button style={buttonStyle} onClick={() => setEditing(true)}>Edit</button>
        )}
      </div>
      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', marginBottom: 0 }}>
        <button style={tabStyle(activeTab === 'company')} onClick={() => setActiveTab('company')}>Company Details</button>
        <button style={tabStyle(activeTab === 'team')} onClick={() => setActiveTab('team')}>Team Members</button>
        <button style={tabStyle(activeTab === 'finance')} onClick={() => setActiveTab('finance')}>Financial Data</button>
      </div>
      {/* Tab Panels */}
      <div style={tabPanelStyle}>
        {activeTab === 'company' && (
          <div>
            {editing ? (
              <>
                <label style={labelStyle}>Company Name
                  <input name="companyName" value={data.companyName} onChange={handleChange} style={inputStyle} />
                </label>
                <label style={labelStyle}>Industry Type
                  <input name="industryType" value={data.industryType} onChange={handleChange} style={inputStyle} />
                </label>
                <label style={labelStyle}>Year Established
                  <input name="yearEstablished" value={data.yearEstablished} onChange={handleChange} style={inputStyle} />
                </label>
                <label style={labelStyle}>HQ Location
                  <input name="hqLocation" value={data.hqLocation} onChange={handleChange} style={inputStyle} />
                </label>
                <label style={labelStyle}>Role in Company
                  <input name="roleInCompany" value={data.roleInCompany} onChange={handleChange} style={inputStyle} />
                </label>
              </>
            ) : (
              <div style={{ fontSize: 17, color: '#334155', lineHeight: 2 }}>
                <div><span style={labelStyle}>Company Name:</span> {data.companyName}</div>
                <div><span style={labelStyle}>Industry Type:</span> {data.industryType}</div>
                <div><span style={labelStyle}>Year Established:</span> {data.yearEstablished}</div>
                <div><span style={labelStyle}>HQ Location:</span> {data.hqLocation}</div>
                <div><span style={labelStyle}>Role in Company:</span> {data.roleInCompany}</div>
              </div>
            )}
          </div>
        )}
        {activeTab === 'team' && (
          <div>
            {data.teamMembers && data.teamMembers.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16, background: '#f8fafc', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 4px rgba(30,41,59,0.04)' }}>
                <thead>
                  <tr style={{ background: '#6366f1', color: '#fff' }}>
                    <th style={{ padding: 12, border: 'none', fontWeight: 700 }}>Name</th>
                    <th style={{ padding: 12, border: 'none', fontWeight: 700 }}>Role</th>
                    <th style={{ padding: 12, border: 'none', fontWeight: 700 }}>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {data.teamMembers.map((m, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? '#f1f5f9' : '#fff' }}>
                      {editing ? (
                        <>
                          <td style={{ padding: 10, border: 'none' }}>
                            <input
                              placeholder="Name"
                              value={m.name}
                              onChange={e => handleTeamMemberChange(i, 'name', e.target.value)}
                              style={inputStyle}
                            />
                          </td>
                          <td style={{ padding: 10, border: 'none' }}>
                            <input
                              placeholder="Role"
                              value={m.role}
                              onChange={e => handleTeamMemberChange(i, 'role', e.target.value)}
                              style={inputStyle}
                            />
                          </td>
                          <td style={{ padding: 10, border: 'none' }}>
                            <input
                              placeholder="Email"
                              value={m.email}
                              onChange={e => handleTeamMemberChange(i, 'email', e.target.value)}
                              style={inputStyle}
                            />
                          </td>
                        </>
                      ) : (
                        <>
                          <td style={{ padding: 10, border: 'none', color: '#334155', fontWeight: 500 }}>{m.name}</td>
                          <td style={{ padding: 10, border: 'none', color: '#334155', fontWeight: 500 }}>{m.role}</td>
                          <td style={{ padding: 10, border: 'none', color: '#334155', fontWeight: 500 }}>{m.email}</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : <div style={{ color: '#64748b', fontStyle: 'italic', padding: 16 }}>No team members.</div>}
          </div>
        )}
        {activeTab === 'finance' && (
          <div>
            {editing ? (
              <>
                <label style={labelStyle}>Cost per Unit
                  <input name="costPerUnit" value={data.costPerUnit} onChange={handleChange} style={inputStyle} />
                </label>
                <label style={labelStyle}>Manufacturing
                  <input name="manufacturing" value={data.manufacturing} onChange={handleChange} style={inputStyle} />
                </label>
                <label style={labelStyle}>Labour Cost
                  <input name="labourCost" value={data.labourCost} onChange={handleChange} style={inputStyle} />
                </label>
                <label style={labelStyle}>Burn Rate
                  <input name="burnRate" value={data.burnRate} onChange={handleChange} style={inputStyle} />
                </label>
                <label style={labelStyle}>Employee Count
                  <input name="employeeCount" value={data.employeeCount} onChange={handleChange} style={inputStyle} />
                </label>
              </>
            ) : (
              <div style={{ fontSize: 17, color: '#334155', lineHeight: 2 }}>
                <div><span style={labelStyle}>Cost per Unit:</span> {data.costPerUnit}</div>
                <div><span style={labelStyle}>Manufacturing:</span> {data.manufacturing}</div>
                <div><span style={labelStyle}>Labour Cost:</span> {data.labourCost}</div>
                <div><span style={labelStyle}>Burn Rate:</span> {data.burnRate}</div>
                <div><span style={labelStyle}>Employee Count:</span> {data.employeeCount}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 