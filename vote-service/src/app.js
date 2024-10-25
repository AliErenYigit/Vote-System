const express = require('express');
const mongoose = require('mongoose');
const voteRoutes = require('./routes/voteRoutes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', voteRoutes);

const PORT = 3003;
const MONGO_URI = 'mongodb+srv://alier:12345678963aey@umdedatabase.l5igl.mongodb.net/';

mongoose.connect(MONGO_URI, { })
    .then(() => {
        console.log('Connected to MongoDB (Vote Service)');
        app.listen(PORT, () => {
            console.log(`Vote service is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
