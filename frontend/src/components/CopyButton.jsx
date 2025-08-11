import { useState } from 'react';
import '../App.css';

export default function CopyButton({ text, className = '' }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (_) {
      // ignored
    }
  }

  // Styles
  const buttonStyle = {
    padding: '0.5rem 0.75rem',
    fontSize: '0.875rem',
    borderRadius: '0.375rem',
    backgroundColor: '#1f2937', // gray-800
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#374151' // gray-700
    },
    ':focus': {
      outline: 'none',
      boxShadow: '0 0 0 2px rgba(79, 70, 229, 0.5)' // indigo-500 with opacity
    },
    ':disabled': {
      opacity: '0.6',
      cursor: 'not-allowed'
    },
    ...(className ? { ...className } : {}) // Apply any additional className styles
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      style={buttonStyle}
      disabled={copied}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}
