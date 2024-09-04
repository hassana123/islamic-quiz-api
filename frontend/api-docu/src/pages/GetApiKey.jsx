// src/pages/GetApiKey.js
import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import axios from 'axios';

const GetApiKey = () => {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const generateApiKey = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://islamic-quiz-api.vercel.app/generate-api-key',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApiKey(response.data.apiKey);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate API key');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    alert('API Key copied to clipboard!');
  };

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-md shadow-md max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Generate Your API Key</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {!apiKey ? (
          <button
            onClick={generateApiKey}
            className="w-full bg-primary text-white text-lg font-semibold py-2 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate API Key'}
          </button>
        ) : (
          <div>
            <div className="bg-gray-100 p-3 rounded-md mt-4 flex justify-between items-center">
              <span className="text-gray-700 truncate">{apiKey}</span>
              <button
                onClick={copyToClipboard}
                className="ml-2 bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600"
              >
                Copy
              </button>
            </div>
            <div className="mt-4 text-gray-700">
              <p className="font-semibold">How to Use Your API Key:</p>
              <p>1. Include the API key in the headers of your requests:</p>
              <pre className="bg-gray-100 p-2 rounded-md mt-2 text-sm">
                {`Authorization: Bearer ${apiKey}`}
              </pre>
              <p className="mt-2">
                2. Use it to authenticate your API requests to the QuizAPI endpoints.
              </p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default GetApiKey;
