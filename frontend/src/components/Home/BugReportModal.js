import React, { useState } from 'react';

const BugReportModal = ({ isOpen, onClose }) => {
  const [bugReport, setBugReport] = useState({ description: '', email: '', category: 'placeholder' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send this to your backend





    console.log('Bug report:', bugReport);
    // Reset form and close modal
    setBugReport({ description: '', email: '', category: 'placeholder' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1f1f1f] p-6 rounded-lg w-[90%] max-w-md">
        <h2 className="text-white text-xl font-bold mb-4">Report a Bug</h2>
        <form onSubmit={handleSubmit}>
          <select
            className="w-full bg-[#2f2f2f] text-white rounded p-2 mb-4"
            value={bugReport.category}
            onChange={(e) => setBugReport({...bugReport, category: e.target.value})}
            required
          >
            <option value="placeholder">Select an issue type...</option>
            <option value="cant-submit">Can't Submit Ticket</option>
            <option value="missing-concerts">Missing Concerts in Slideshow</option>
            <option value="no-slideshow">Slideshow Didn't Appear</option>
            <option value="other">Other</option>

          </select>
          <textarea
            className="w-full bg-[#2f2f2f] text-white rounded p-2 mb-4"
            placeholder="Describe the bug..."
            rows="4"
            value={bugReport.description}
            onChange={(e) => setBugReport({...bugReport, description: e.target.value})}
            required
          />
          <input
            type="email"
            className="w-full bg-[#2f2f2f] text-white rounded p-2 mb-4"
            placeholder="Your email (optional)"
            value={bugReport.email}
            onChange={(e) => setBugReport({...bugReport, email: e.target.value})}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 text-gray-400 hover:text-white"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BugReportModal; 