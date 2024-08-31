const crypto = require('crypto');
const { ObjectId } = require('mongodb');

async function generateApiKey(user, role) {
  const db = req.app.get("db");
  const apiKeyCollection = db.collection('apiKeys');

  const key = crypto.randomBytes(32).toString('hex');
  const apiKeyData = {
    _id: new ObjectId(),
    key: key,
    user: user,
    role: role,
    createdAt: new Date(),
    expiresAt: null,  // Set if you want the key to expire
  };

  await apiKeyCollection.insertOne(apiKeyData);

  return key;  // Return the generated key
}

module.exports = { generateApiKey };
