const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    candidateId: { type: mongoose.Schema.Types.ObjectId, required: true },
    voteDate: { type: Date, default: Date.now }
}, { timestamps: true });

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
