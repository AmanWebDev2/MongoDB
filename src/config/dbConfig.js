const mongoose = require('mongoose');
const { DB_URL } = require('./serverConfig');

const connectDb = async() => {
    try {
        await mongoose.connect(DB_URL);
        console.log("db connected")
    } catch (error) {
        throw error;
    }
}

module.exports = connectDb;