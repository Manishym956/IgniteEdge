import React, { useState } from 'react';
import './NewPassword.css';
import illustration from './assets/Illustration.jpeg';

function CreatePassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
   
  };

  return (
    <div className="container">
      <div className="card">
        <div className="illustration-container">
          <img 
            src={illustration}
            alt="Create Password Illustration" 
            className="illustration" 
          />
        </div>
        <div className="form-container">
          <div className="logo">IgniteEdge</div>
          <h1>Create New Password</h1>
          <p>Your new password must be different from previous used passwords.</p>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input 
                type="password" 
                placeholder="New Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input 
                type="password" 
                placeholder="Confirm Password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">CREATE PASSWORD</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePassword;