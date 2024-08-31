const express = require('express');
const { generateApiKey } = require('../controllers/apiKeyController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// Protected route to generate API key (only accessible by authenticated users)
router.post('/generate-api-key', authenticate, generateApiKey);

module.exports = router;
