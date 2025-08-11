import { useEffect, useMemo, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { deleteUrl, getAllUrls } from '../services/api';

export default function AdminDashboard() {
  const [urls, setUrls] = useState([]);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [confirm, setConfirm] = useState({ open: false, id: null });
  const token = localStorage.getItem('admin_token');

  // Function to fetch URLs
  const fetchUrls = async () => {
    try {
      const res = await getAllUrls(token);
      setUrls(res.data || []);
    } catch (err) {
      console.error('Error fetching URLs:', err);
      if (!err?.response?.status === 401) { // Don't show error for unauthorized
        toast.error(err?.response?.data?.message || 'Failed to load');
      }
    }
  };

  // Initial load
  useEffect(() => {
    fetchUrls();
    
    // Set up interval to refresh data every 10 seconds
    const intervalId = setInterval(fetchUrls, 10000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [token]);

  const filtered = useMemo(() => {
    if (!q) return urls;
    return urls.filter((u) =>
      [u.originalUrl, u.shortUrl, u.shortCode].some((f) => f?.toLowerCase().includes(q.toLowerCase())),
    );
  }, [q, urls]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  async function doDelete(id) {
    try {
      await deleteUrl(id, token);
      setUrls((prev) => prev.filter((u) => u.id !== id));
      toast.success('Deleted');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Delete failed');
    }
  }

  // Table Styles
  const tableHeaderStyle = {
    padding: '0.75rem 1rem',
    fontWeight: '500',
    color: '#374151',
    borderBottom: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb'
  };

  const tableRowStyle = {
    borderTop: '1px solid #e5e7eb',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#f9fafb'
    }
  };

  const tableCellStyle = {
    padding: '0.75rem 1rem',
    verticalAlign: 'middle',
    borderBottom: '1px solid #e5e7eb'
  };

  const linkStyle = {
    color: '#4f46e5',
    textDecoration: 'underline',
    wordBreak: 'break-all',
    ':hover': {
      color: '#4338ca'
    }
  };

  const codeStyle = {
    fontFamily: 'monospace',
    backgroundColor: '#f3f4f6',
    padding: '0.2rem 0.4rem',
    borderRadius: '0.25rem',
    fontSize: '0.875em'
  };

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
    padding: '0.125rem 0.5rem',
    borderRadius: '9999px',
    backgroundColor: '#eef2ff',
    color: '#4338ca',
    fontSize: '0.75rem',
    fontWeight: '500',
    border: '1px solid #c7d2fe'
  };

  // Pagination Styles
  const paginationContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '1rem',
    gap: '1rem',
    '@media (min-width: 640px)': {
      flexDirection: 'row'
    }
  };

  const paginationTextStyle = {
    fontSize: '0.875rem',
    color: '#4b5563',
    margin: 0
  };

  const paginationButtonsStyle = {
    display: 'flex',
    gap: '0.5rem'
  };

  const paginationButtonStyle = {
    padding: '0.375rem 0.75rem',
    fontSize: '0.875rem',
    borderRadius: '0.375rem',
    border: '1px solid #d1d5db',
    backgroundColor: 'white',
    color: '#374151',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover:not(:disabled)': {
      backgroundColor: '#f9fafb'
    },
    ':focus': {
      outline: 'none',
      borderColor: '#4f46e5',
      boxShadow: '0 0 0 2px rgba(79, 70, 229, 0.2)'
    }
  };

  // Modal Styles
  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
    padding: '1rem'
  };

  const modalBackdropStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: -1
  };

  const modalContentStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: '24rem',
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  };

  const modalTitleStyle = {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#111827',
    margin: 0
  };

  const modalTextStyle = {
    fontSize: '0.875rem',
    color: '#4b5563',
    margin: '0.25rem 0 0 0'
  };

  const modalActionsStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.5rem',
    marginTop: '1.5rem'
  };

  const cancelButtonStyle = {
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    backgroundColor: 'white',
    border: '1px solid #d1d5db',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#f9fafb'
    },
    ':focus': {
      outline: 'none',
      borderColor: '#4f46e5',
      boxShadow: '0 0 0 2px rgba(79, 70, 229, 0.2)'
    }
  };

  const confirmDeleteButtonStyle = {
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: 'white',
    backgroundColor: '#dc2626',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#b91c1c'
    },
    ':focus': {
      outline: 'none',
      boxShadow: '0 0 0 2px rgba(220, 38, 38, 0.5)'
    }
  };

  const deleteButtonStyle = {
    padding: '0.375rem 0.75rem',
    fontSize: '0.75rem',
    fontWeight: '500',
    color: 'white',
    backgroundColor: '#dc2626',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#b91c1c'
    }
  };

  // Layout Styles
  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    padding: '2.5rem 1rem'
  };

  const contentStyle = {
    maxWidth: '80rem',
    margin: '0 auto',
    padding: '0 1rem'
  };

  const headerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '1.5rem'
  };

  const headerContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    '@media (min-width: 640px)': {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#111827',
    margin: 0
  };

  const subtitleStyle = {
    fontSize: '0.875rem',
    color: '#4b5563',
    margin: '0.25rem 0 0 0'
  };

  const searchContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    flexWrap: 'wrap'
  };

  const searchInputStyle = {
    width: '16rem',
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

  const logoutButtonStyle = {
    padding: '0.5rem 0.75rem',
    fontSize: '0.875rem',
    borderRadius: '0.375rem',
    backgroundColor: '#111827',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#1f2937'
    }
  };

  return (
    <div style={containerStyle}>
      <Toaster position="top-right" />
      <div style={contentStyle}>
        <div style={headerStyle}>
          <div style={headerContentStyle}>
            <div>
              <h1 style={titleStyle}>Admin Dashboard</h1>
              <p style={subtitleStyle}>Manage your shortened links</p>
            </div>
            <div style={searchContainerStyle}>
              <input
                type="text"
                placeholder="Search by URL or code..."
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setPage(1);
                }}
                style={searchInputStyle}
              />
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem('admin_token');
                  window.location.href = '/admin/login';
                }}
                style={logoutButtonStyle}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          border: '1px solid #e5e7eb',
          overflowX: 'auto'
        }}>
          <table style={{
            width: '100%',
            fontSize: '0.875rem',
            borderCollapse: 'collapse',
            minWidth: '640px'
          }}>
            <thead>
              <tr style={{
                backgroundColor: '#f9fafb',
                textAlign: 'left'
              }}>
                <th style={tableHeaderStyle}>Original URL</th>
                <th style={tableHeaderStyle}>Short URL</th>
                <th style={tableHeaderStyle}>Code</th>
                <th style={tableHeaderStyle}>Created</th>
                <th style={tableHeaderStyle}>Visits</th>
                <th style={tableHeaderStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {current.map((u) => (
                <tr key={u.id} style={tableRowStyle}>
                  <td style={tableCellStyle}>
                    <a 
                      href={u.originalUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      style={linkStyle}
                    >
                      {u.originalUrl}
                    </a>
                  </td>
                  <td style={tableCellStyle}>
                    <a 
                      href={u.shortUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      style={linkStyle}
                    >
                      {u.shortUrl}
                    </a>
                  </td>
                  <td style={tableCellStyle}>
                    <code style={codeStyle}>{u.shortCode}</code>
                  </td>
                  <td style={tableCellStyle}>
                    {new Date(u.createdAt).toLocaleString()}
                  </td>
                  <td style={tableCellStyle}>
                    <span style={badgeStyle}>
                      {u.visitCount || 0}
                    </span>
                  </td>
                  <td style={tableCellStyle}>
                    <button
                      type="button"
                      onClick={() => setConfirm({ open: true, id: u.id })}
                      style={deleteButtonStyle}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td 
                    style={{
                      ...tableCellStyle,
                      textAlign: 'center',
                      color: '#6b7280',
                      padding: '1.5rem 1rem'
                    }} 
                    colSpan={6}
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filtered.length > pageSize && (
          <div style={paginationContainerStyle}>
            <p style={paginationTextStyle}>
              Page <span style={{ fontWeight: '500' }}>{page}</span> of <span style={{ fontWeight: '500' }}>{totalPages}</span>
            </p>
            <div style={paginationButtonsStyle}>
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                style={{
                  ...paginationButtonStyle,
                  opacity: page === 1 ? '0.5' : '1',
                  cursor: page === 1 ? 'not-allowed' : 'pointer'
                }}
              >
                Prev
              </button>
              <button
                type="button"
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                style={{
                  ...paginationButtonStyle,
                  opacity: page === totalPages ? '0.5' : '1',
                  cursor: page === totalPages ? 'not-allowed' : 'pointer'
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirm Delete Modal */}
      {confirm.open && (
        <div style={modalOverlayStyle}>
          <div 
            style={modalBackdropStyle}
            onClick={() => setConfirm({ open: false, id: null })} 
          />
          <div style={modalContentStyle}>
            <h3 style={modalTitleStyle}>Delete short URL?</h3>
            <p style={modalTextStyle}>This action cannot be undone.</p>
            <div style={modalActionsStyle}>
              <button
                type="button"
                style={cancelButtonStyle}
                onClick={() => setConfirm({ open: false, id: null })}
              >
                Cancel
              </button>
              <button
                type="button"
                style={confirmDeleteButtonStyle}
                onClick={() => {
                  const id = confirm.id;
                  setConfirm({ open: false, id: null });
                  doDelete(id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
