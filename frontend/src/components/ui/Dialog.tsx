import React from 'react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

// Main Dialog component (named export)
export const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          minWidth: '300px',
          maxWidth: '80%',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {title && <h2 style={{ marginTop: 0, marginBottom: '15px' }}>{title}</h2>}
        {children}
        <button
          onClick={onClose}
          style={{
            marginTop: '20px',
            padding: '8px 15px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Placeholder components for Shadcn-style imports
export const DialogContent: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
export const DialogHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
export const DialogTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h3 style={{ margin: 0 }}>{children}</h3>;
export const DialogFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;