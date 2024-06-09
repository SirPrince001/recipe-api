require('dotenv').config();
const mongoose = require('mongoose');

module.exports = {
    connectDB: () => {
        mongoose.connect(process.env.MONGODB_URL);
        const dbConnection = mongoose.connection;
        dbConnection.once('open', () => {
            console.log('Connected to database successfully..');
        })
        dbConnection.on('error', () => {
            console.log('Unable to connect to database');
            process.exit(1);
        })
    }
} 