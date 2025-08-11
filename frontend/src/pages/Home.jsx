import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { createShortUrl } from '../services/api';
import CopyButton from '../components/CopyButton';
import '../App.css';

const heroStyles = {
  minHeight: '100vh',
  background: 'linear-gradient(to bottom, #eef2ff, #ffffff, #ecfdf5)'
};

const containerStyles = {
  maxWidth: '48rem',
  margin: '0 auto',
  padding: '4rem 1rem'
};

const badgeStyles = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.25rem 0.75rem',
  borderRadius: '9999px',
  backgroundColor: '#e0e7ff',
  color: '#4338ca',
  fontSize: '0.75rem',
  fontWeight: '500',
  border: '1px solid #c7d2fe',
  marginBottom: '1rem'
};

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    try {
      const data = await createShortUrl(url);
      setResult(data);
      toast.success('Short URL created');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={heroStyles}>
      <Toaster position="top-right" />
      <div style={containerStyles}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={badgeStyles}>
            Blazing fast & privacy-first
          </div>
          <h1 style={{
            marginTop: '1rem',
            fontSize: '2.5rem',
            fontWeight: '800',
            lineHeight: '1.2',
            background: 'linear-gradient(90deg, #4f46e5, #7c3aed, #06b6d4)', 
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.5rem'
          }}>
            Shorten Your Links
          </h1>
          <p style={{
            color: '#4b5563',
            fontSize: '1.125rem',
            marginTop: '0.75rem',
            lineHeight: '1.6'
          }}>
            Paste your long URL below and get a tiny, shareable link.
          </p>
        </div>

        <form 
          onSubmit={onSubmit} 
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            borderRadius: '1rem',
            border: '1px solid #e5e7eb',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            padding: '1.25rem',
            display: 'flex',
            gap: '0.75rem',
            transition: 'box-shadow 0.3s ease',
            ':hover': {
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          <input
            type="url"
            placeholder="https://example.com/very/long/path"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{
              flex: 1,
              borderRadius: '0.5rem',
              border: '1px solid #d1d5db',
              padding: '0.75rem 1rem',
              fontSize: '1rem',
              outline: 'none',
              transition: 'all 0.2s',
              ':focus': {
                borderColor: '#4f46e5',
                boxShadow: '0 0 0 2px rgba(79, 70, 229, 0.2)'
              }
            }}
            required
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              backgroundColor: '#4f46e5',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              transition: 'all 0.2s',
              ':hover:not(:disabled)': {
                backgroundColor: '#4338ca'
              },
              ':focus': {
                outline: 'none',
                boxShadow: '0 0 0 2px rgba(79, 70, 229, 0.5)'
              },
              ':disabled': {
                opacity: '0.6',
                cursor: 'not-allowed'
              }
            }}
          >
            {loading ? 'Working...' : 'Shorten'}
          </button>
        </form>

        {result && (
          <div style={{
            marginTop: '2rem',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            borderRadius: '1rem',
            border: '1px solid #e5e7eb',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            padding: '1.5rem'
          }}>
            <h2 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '0.5rem'
            }}>Your short link</h2>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              '@media (min-width: 640px)': {
                flexDirection: 'row',
                alignItems: 'center'
              }
            }}>
              <a
                href={result.shortUrl}
                style={{
                  color: '#4f46e5',
                  textDecoration: 'underline',
                  wordBreak: 'break-all',
                  flex: '1 1 0%',
                  minWidth: '0'
                }}
                target="_blank"
                rel="noreferrer"
              >
                {result.shortUrl}
              </a>
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                flexShrink: '0'
              }}>
                <CopyButton text={result.shortUrl} />
                <a
                  href={result.shortUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.875rem',
                    borderRadius: '0.375rem',
                    backgroundColor: '#f3f4f6',
                    color: '#1f2937',
                    textDecoration: 'none',
                    transition: 'background-color 0.2s',
                    ':hover': {
                      backgroundColor: '#e5e7eb'
                    }
                  }}
                >
                  Open
                </a>
              </div>
            </div>
          </div>
        )}

        <div style={{
          marginTop: '3.5rem',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1rem',
          '@media (min-width: 640px)': {
            gridTemplateColumns: 'repeat(3, 1fr)'
          }
        }}>
          <Feature title="Privacy-first" desc="No tracking beyond a simple visit count." />
          <Feature title="Open API" desc="Simple REST endpoints for integration." />
          <Feature title="Admin tools" desc="Secure dashboard to manage links." />
        </div>

        <div style={{
          marginTop: '2rem',
          textAlign: 'center',
          fontSize: '0.875rem',
          color: '#4b5563'
        }}>
          Looking to manage links?{' '}
          <a 
            href="/admin/login" 
            style={{
              color: '#4f46e5',
              textDecoration: 'underline'
            }}
          >
            Admin login
          </a>
        </div>
      </div>
    </div>
  );
}

function Feature({ title, desc }) {
  return (
    <div style={{
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(8px)',
      borderRadius: '0.75rem',
      border: '1px solid #e5e7eb',
      padding: '1rem',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      transition: 'box-shadow 0.2s',
      ':hover': {
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }
    }}>
      <div style={{
        fontWeight: '600',
        color: '#111827',
        fontSize: '0.875rem'
      }}>{title}</div>
      <div style={{
        color: '#4b5563',
        marginTop: '0.25rem',
        fontSize: '0.875rem'
      }}>{desc}</div>
    </div>
  );
}
