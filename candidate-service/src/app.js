const express = require('express');
const mongoose = require('mongoose');
const candidateRoutes = require('./routes/candidateRoutes');
const cors = require('cors');

const app = express();
app.use(cors()); 
app.use(express.json());
app.use('/api', candidateRoutes);

const PORT = 3002;
const MONGO_URI = 'mongodb+srv://alier:12345678963aey@umdedatabase.l5igl.mongodb.net/';

mongoose.connect(MONGO_URI, {})
    .then(() => {
        console.log('Connected to MongoDB (Candidate Service)');
        app.listen(PORT, () => {
            console.log(`Candidate service is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
