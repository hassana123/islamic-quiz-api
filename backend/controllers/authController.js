const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

async function registerUser(req, res) {
    const db = req.app.get('db');
    const usersCollection = db.collection('users');
    const { email, password } = req.body;

    try {
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { email, password: hashedPassword, apiKey: null };

        const result = await usersCollection.insertOne(newUser);
        res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function loginUser(req, res) {
    const db = req.app.get('db');
    const usersCollection = db.collection('users');
    const { email, password } = req.body;

    try {
        const user = await usersCollection.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        console.log('JWT_SECRET:', process.env.JWT_SECRET);
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log('JWT_SECRET:', process.env.JWT_SECRET);
    }
}




module.exports = { registerUser,loginUser };
