import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { adminLogin } from '../services/api';
import '../App.css';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { token } = await adminLogin(username, password);
      localStorage.setItem('admin_token', token);
      toast.success('Logged in');
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #ffffff, #f9fafb)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem'
  };

  const formStyle = {
    width: '100%',
    maxWidth: '28rem',
    backgroundColor: 'white',
    borderRadius: '1rem',
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.5rem 0.75rem',
    borderRadius: '0.5rem',
    border: '1px solid #d1d5db',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'all 0.2s',
    ':focus': {
      borderColor: '#4f46e5',
      boxShadow: '0 0 0 2px rgba(79, 70, 229, 0.2)'
    }
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    ':hover:not(:disabled)': {
      backgroundColor: '#4338ca'
    },
    ':disabled': {
      opacity: '0.6',
      cursor: 'not-allowed'
    }
  };

  return (
    <div style={containerStyle}>
      <Toaster position="top-right" />
      <form onSubmit={onSubmit} style={formStyle}>
        <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          <h1 style={{ 
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '0.25rem'
          }}>
            Admin Login
          </h1>
          <p style={{ 
            fontSize: '0.875rem',
            color: '#4b5563',
            margin: 0
          }}>
            Access the admin dashboard
          </p>
        </div>
        
        <div style={{
          backgroundColor: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '0.5rem',
          padding: '0.75rem',
          marginBottom: '0.5rem'
        }}>
          <p style={{
            fontSize: '0.75rem',
            color: '#1e40af',
            margin: 0,
            lineHeight: '1.4'
          }}>
            <strong>Default credentials:</strong><br />
            Username: <code style={{
              backgroundColor: '#dbeafe',
              padding: '0.125rem 0.25rem',
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
              fontFamily: 'monospace'
            }}>admin</code><br />
            Password: <code style={{
              backgroundColor: '#dbeafe',
              padding: '0.125rem 0.25rem',
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
              fontFamily: 'monospace'
            }}>admin123</code>
          </p>
        </div>

        <div>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '0.25rem'
          }}>
            Username
          </label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '0.25rem'
          }}>
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          style={buttonStyle}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
