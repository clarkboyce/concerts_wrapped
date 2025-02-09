import React from 'react';

const ErrorModal = ({ open, onClose, error }) => {
  if (!open) return null;

  const getErrorMessage = () => {
    if (!error) return 'An unexpected error occurred.';

    switch (error.status) {
      case 400:
        return 'Please check your ticket information and try again.';
      case 401:
        return 'Your session has expired. Please log in again.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested concert information could not be found.';
      case 429:
        return 'Too many requests. Please wait a moment and try again.';
      case 500:
        return 'Server error. Our team has been notified.';
      default:
        return error.message || 'Failed to process your request. Please try again.';
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-[#1f1f1f] text-white p-6 rounded-lg w-[90%] max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-red-500">
            Error {error?.status && `(${error.status})`}
          </h2>
        </div>
        <div className="mb-6">
          <p className="text-white">
            {getErrorMessage()}
          </p>
        </div>
        <div className="flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-[#73737330] hover:bg-[#73737350] rounded transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
