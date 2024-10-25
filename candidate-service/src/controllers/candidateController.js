const Candidate = require('../models/candidate');

// Aday ekle
exports.createCandidate = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newCandidate = new Candidate({ name, description });
        await newCandidate.save();
        res.status(201).json({ message: 'Candidate created successfully', candidate: newCandidate });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Adayları listele
exports.getCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.status(200).json(candidates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
