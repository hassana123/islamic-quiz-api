import React from 'react'

const NonTechiesSupportPage = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
    <header className="mb-6">
      <h1 className="text-3xl font-bold text-center mb-4">Non-Techies Support</h1>
      <p className="text-lg text-center">This section is designed to help non-techies understand how to use our API and integrate it into your applications.</p>
    </header>
    
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">What is an API?</h2>
      <p className="mb-4">An API (Application Programming Interface) is a set of rules and tools that allows different software applications to communicate with each other. Our API provides quiz questions that you can use in your app.</p>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">How to Use Our API</h2>
      <p className="mb-4">To use our API, you need an API key, which you can get by <a href="/register" className="text-blue-500 underline">registering here</a>. Once you have the key, you can make requests to our API to get quiz questions.</p>
      <p className="mb-4">For example, to get questions, you would send a request to our API endpoint with your API key and any filters you want to apply (e.g., category, difficulty).</p>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">FAQs</h2>
      <ul className="list-disc list-inside pl-4">
        <li className="mb-2">
          <strong>What do I need to start using the API?</strong>
          <p>You need an API key, which you can obtain by <a href="/register" className="text-blue-500 underline">registering</a> on our website.</p>
        </li>
        <li className="mb-2">
          <strong>How do I get support if I need help?</strong>
          <p>If you need help, please visit our <a href="/feedback" className="text-blue-500 underline">feedback page</a> or contact our support team.</p>
        </li>
        <li className="mb-2">
          <strong>Where can I find more information?</strong>
          <p>For more detailed information, check our <a href="/documentation" className="text-blue-500 underline">API documentation</a>.</p>
        </li>
      </ul>
    </section>
  </div>

  )
}

export default NonTechiesSupportPage
