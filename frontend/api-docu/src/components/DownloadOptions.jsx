import React from 'react';

const DownloadOptions = ({ downloadFormat, onFormatChange, onDownload, isDisabled, loading }) => (
  <div className="mt-4">
    <label className="mr-4">Download as:</label>
    <select
      value={downloadFormat}
      onChange={(e) => onFormatChange(e.target.value)}
      className="p-2 border rounded"
    >
      <option value="">Select format</option>
      <option value="csv">CSV</option>
      <option value="pdf">PDF</option>
    </select>

    <div className="mt-4">
      <button
        onClick={onDownload}
        disabled={isDisabled}
        className={`px-4 py-2 text-[#fff] rounded ${loading ? "bg-[#333] cursor-not-allowed" : "bg-primary"}`}
      >
        {loading ? "Downloading..." : "Download Selected"}
      </button>
    </div>
  </div>
);

export default DownloadOptions;
