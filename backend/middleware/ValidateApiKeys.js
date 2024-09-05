async function validateApiKey(req, res, next) {
    const db = req.app.get('db');
    const usersCollection = db.collection('users');
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return res.status(401).json({ message: 'API key required' });
    }

    try {
        const user = await usersCollection.findOne({ apiKey });
        if (!user) {
            return res.status(401).json({ message: 'Invalid API key' });
        }
        req.user = user;  
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = validateApiKey;
