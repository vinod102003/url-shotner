import { Link, useLocation } from 'react-router-dom';
import '../App.css';

export default function Navbar() {
  const location = useLocation();
  const adminToken = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
  const userToken = typeof window !== 'undefined' ? localStorage.getItem('user_token') : null;

  const navLinkStyle = (isActive) => ({
    padding: '0.375rem 0.75rem',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    textDecoration: 'none',
    ...(isActive 
      ? { backgroundColor: '#1f2937', color: 'white' }
      : { color: '#374151', backgroundColor: 'transparent' }
    ),
    ':hover': {
      backgroundColor: isActive ? '#1f2937' : '#f3f4f6',
    },
  });

  const headerStyle = {
    backgroundColor: 'white',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 50,
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0.75rem 1rem',
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: '1.25rem',
    fontWeight: 'bold',
  };

  const navLinksStyle = {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center',
  };

  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <Link to="/" style={logoStyle}>
          <span style={{ color: '#4f46e5', fontWeight: '800' }}>Short</span>
          <span style={{ color: '#1f2937', fontWeight: '800' }}>Link</span>
        </Link>
        <div style={navLinksStyle}>
          <Link
            to="/"
            style={navLinkStyle(location.pathname === '/')}
          >
            Home
          </Link>
          {adminToken ? (
            <>
              <Link
                to="/admin/dashboard"
                style={navLinkStyle(location.pathname.startsWith('/admin'))}
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem('admin_token');
                  window.location.href = '/';
                }}
                style={{
                  padding: '0.375rem 0.75rem',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  backgroundColor: '#1f2937',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  ':hover': {
                    backgroundColor: '#111827',
                  },
                  marginLeft: '0.5rem', // added margin to fix alignment
                }}
              >
                Logout
              </button>
            </>
          ) : userToken ? (
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem('user_token');
                localStorage.removeItem('user_role');
                localStorage.removeItem('user_name');
                window.location.href = '/';
              }}
              style={{
                padding: '0.375rem 0.75rem',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                backgroundColor: '#1f2937',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                ':hover': {
                  backgroundColor: '#111827',
                },
                marginLeft: '0.5rem', // added margin to fix alignment
              }}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/admin/login"
              style={{
                padding: '0.375rem 0.75rem',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                textDecoration: 'none',
                ...(location.pathname === '/admin/login'
                  ? { backgroundColor: '#4f46e5', color: 'white' }
                  : { color: '#374151', backgroundColor: 'transparent' }),
                ':hover': {
                  backgroundColor: location.pathname === '/admin/login' ? '#4338ca' : '#f3f4f6',
                },
              }}
            >
              Admin
            </Link>
          )}
          {!adminToken && !userToken && (
            <>
              <Link
                to="/login"
                style={{
                  padding: '0.375rem 0.75rem',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  ...(location.pathname === '/login'
                    ? { backgroundColor: '#1f2937', color: 'white' }
                    : { color: '#374151', backgroundColor: 'transparent' }),
                  ':hover': {
                    backgroundColor: location.pathname === '/login' ? '#111827' : '#f3f4f6',
                  },
                }}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`px-3 py-1.5 rounded-md text-sm ${
                  location.pathname === '/signup' ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
