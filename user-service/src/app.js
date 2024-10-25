const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');



const app = express();
app.use(express.json());
app.use(express.static('frontend'));
app.use('/api', userRoutes);


const PORT = 3000;


mongoose.connect('mongodb+srv://alier:12345678963aey@umdedatabase.l5igl.mongodb.net/', {
   
    
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Sunucuyu başlatma
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
