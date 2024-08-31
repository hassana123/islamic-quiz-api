const crypto = require('crypto');
const { ObjectId } = require('mongodb');

async function generateApiKey(req, res) {
    const db = req.app.get('db');
    const usersCollection = db.collection('users');
    const userId = req.user.userId;  // Decoded from the JWT

    try {
        // Generate a new API key
        const apiKey = crypto.randomBytes(32).toString('hex');

        // Store the API key in the database tied to the user's account
        await usersCollection.updateOne({ _id: new ObjectId(userId) }, { $set: { apiKey } });

        // Respond with the API key to the frontend
        res.status(200).json({ apiKey });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { generateApiKey };
