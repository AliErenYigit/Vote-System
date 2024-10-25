const User = require('../models/user');

// Kullanıcı oluştur
exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Kullanıcıları listele
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kullanıcıyı email ile bulalım
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Şifre doğrulaması (düz metin karşılaştırma)
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Başarılı giriş mesajı
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
