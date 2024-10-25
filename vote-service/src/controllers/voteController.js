const Vote = require('../models/vote');

// Oy verme
exports.voteForCandidate = async (req, res) => {
    try {
        const { userId, candidateId } = req.body;

        console.log('Oy verme isteği alındı: ', req.body);

        // Aynı kullanıcı birden fazla oy veremesin
        const existingVote = await Vote.findOne({ userId, candidateId });
        if (existingVote) {
            return res.status(400).json({ message: 'Kullanıcı zaten oy verdi, başka bir adaya oy veremez' });
        }

        const newVote = new Vote({ userId, candidateId });
        await newVote.save();

       const voteCount = await Vote.countDocuments({ candidateId });

        res.status(201).json({ message: 'Oy başarıyla kaydedildi', vote: newVote });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Kullanıcının oy verip vermediğini kontrol eden API
exports.checkUserVote = async (req, res) => {
    try {
        const { userId } = req.params;
        const existingVote = await Vote.findOne({ userId });
        if (existingVote) {
            res.status(200).json({ hasVoted: true });
        } else {
            res.status(200).json({ hasVoted: false });
        }
    } catch (error) {
        console.error('Kullanıcının oy durumu kontrol edilirken hata oluştu: ', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Adayın oy sayısı
exports.getCandidateVotes = async (req, res) => {
    try {
        const { candidateId } = req.params;

        // Adayın oy sayısını al
        const voteCount = await Vote.countDocuments({ candidateId });
        res.status(200).json({ candidateId, voteCount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
