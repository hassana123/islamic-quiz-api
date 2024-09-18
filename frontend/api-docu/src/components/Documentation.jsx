// src/components/Documentation.js
import React from 'react';

const Documentation = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">API Documentation</h1>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
        <p>
          Welcome to the API documentation for the Islamic Quiz API. This API allows you to integrate Islamic quiz questions into your applications. 
          To use this API, you need to obtain an API key by registering on our platform. 
          The API key should be included in the header of each request.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Authentication</h2>
        <p>
          The API uses token-based authentication. To include your API key in your requests, you must add it to the headers of each request.
        </p>
        <p><strong>Headers:</strong></p>
        <pre className="bg-gray-100 p-4 rounded-md">
{`{
  headers: {
    'x-api-key': 'YOUR_API_KEY',
    'Content-Type': 'application/json' // Ensure JSON format
  }
}`}
        </pre>
        <p>Replace `YOUR_API_KEY` with the actual API key you obtained from the dashboard.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Obtaining an API Key</h2>
        <p>
          To get an API key, follow these steps:
        </p>
        <ol className="list-decimal pl-6">
          <li><strong>Sign Up:</strong> If you are a new user, sign up on our platform.</li>
          <li><strong>Log In:</strong> After signing up, log in to your account.</li>
          <li><strong>Access Dashboard:</strong> Once logged in, you will be redirected to your dashboard.</li>
          <li><strong>Generate API Key:</strong> On the dashboard, navigate to the sidebar and click on the "Generate API Key" link. Click the button that says "Generate API Key" to create your API key.</li>
          <li><strong>Copy API Key:</strong> The generated API key will be available for copy. Use this key in the headers of your API requests.</li>
        </ol>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Available Endpoints</h2>
        
        <h3 className="text-xl font-semibold mb-2">1. Get Quiz Questions</h3>
        <p><strong>Endpoint:</strong> <code>https://islamic-questions-api.vercel.app/questions</code></p>
        <p><strong>Method:</strong> GET</p>
        <p><strong>Description:</strong> Retrieve a list of quiz questions from the database.</p>
        <p><strong>Query Parameters:</strong></p>
        <p><strong>Headers:</strong> x-api-key: YOUR_API_KEY</p>

        <ul className="list-disc pl-6">
          <li><strong>category:</strong> (Optional) Filter questions by category.</li>
          <li><strong>difficulty:</strong> (Optional) Filter questions by difficulty level.</li>
        </ul>
        <p><strong>Response:</strong></p>
        <pre className="bg-gray-100 p-4 rounded-md">
{`{
  "questions": [
    {
      "_id": "66eacacaea3b1375b15fe4dd",
      "question": "Eating Sahoor (Predawn meal) is",
      "options": [
        "Sunnah",
        "Waajib",
        "Permissible",
        "Makrooh"
      ],
      "answer": "Sunnah",
      "justification": "Anas (Allah be pleased with him) reported Allah's Messenger (ﷺ) as saying: 'Take a meal a little before dawn, for there is a blessing in taking meal at that time.' (Sahih Muslim 1095)",
      "category": "Fasting",
      "difficulty": "Easy"
    },
    ...
  ]
}`}
        </pre>

        <h3 className="text-xl font-semibold mb-2">2. Submit a Question</h3>
        <p><strong>Endpoint:</strong> <code>https://islamic-questions-api.vercel.app/questions</code></p>
        <p><strong>Method:</strong> POST</p>
        <p><strong>Description:</strong> Submit a new question to the quiz database.</p>
        <p><strong>Request Body:</strong></p>
        <pre className="bg-gray-100 p-4 rounded-md">
{`{
  "question": "Reciting Surah Fatiha in each rakat of the salah is….?",
  "options": [
    "Optional",
    "Encouraged",
    "Not necessary",
    "Mandatory"
  ],
  "answer": "Mandatory",
  "justification": "Prophet Muhammad ﷺ said: 'There is no prayer for the one who does not recite the Opening of the Book [i.e., al-Fatiha].' (Bukhari 714)",
  "category": "Salah",
  "difficulty": "Easy"
}`}
        </pre>
        <p><strong>Headers:</strong> x-api-key: YOUR_API_KEY</p>
        <br/>
        <p><strong>Response:</strong></p>
        <pre className="bg-gray-100 p-4 rounded-md">
{`{
  "message": "Question submitted successfully."
}`}
        </pre>

        <h3 className="text-xl font-semibold mb-2">3. Generate API Key</h3>
        <p><strong>Endpoint:</strong> <code>https://islamic-questions-api.vercel.app/generate-api-key</code></p>
        <p><strong>Method:</strong> POST</p>
        <p><strong>Description:</strong> Generate a new API key for accessing the API.</p>
        <p><strong>Request Body:</strong> None</p>
        <p><strong>Response:</strong></p>
        <pre className="bg-gray-100 p-4 rounded-md">
{`{
  "apiKey": "new_generated_api_key"
}`}
        </pre>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Error Handling</h2>
        <p>
          In case of errors, the API will return appropriate HTTP status codes and error messages. 
          Common error codes include:
        </p>
        <ul className="list-disc pl-6">
          <li><strong>400 Bad Request:</strong> Invalid request format or parameters.</li>
          <li><strong>401 Unauthorized:</strong> Missing or invalid API key.</li>
          <li><strong>404 Not Found:</strong> Endpoint not found.</li>
          <li><strong>500 Internal Server Error:</strong> An unexpected error occurred on the server.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Additional Information</h2>
        <p>
          For more information, including usage limits and additional features, please visit our website or contact our support team.
        </p>
      </section>
    </div>
  );
};

export default Documentation;
