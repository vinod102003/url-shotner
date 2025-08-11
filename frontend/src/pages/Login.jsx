import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/api/auth/login', { username, password });
      localStorage.setItem('user_token', data.token);
      localStorage.setItem('user_role', data.role);
      localStorage.setItem('user_name', data.username);
      toast.success('Logged in');
      navigate('/');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  // Styles
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
    maxWidth: '24rem',
    backgroundColor: 'white',
    borderRadius: '1rem',
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    margin: '0 0 0.5rem 0'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '0.25rem'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.5rem 0.75rem',
    fontSize: '0.875rem',
    borderRadius: '0.5rem',
    border: '1px solid #d1d5db',
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
    fontSize: '0.875rem',
    fontWeight: '500',
    color: 'white',
    backgroundColor: '#4f46e5',
    border: 'none',
    borderRadius: '0.5rem',
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
        <h1 style={titleStyle}>Login</h1>
        <div>
          <label style={labelStyle}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Password</label>
          <input
            type="password"
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
