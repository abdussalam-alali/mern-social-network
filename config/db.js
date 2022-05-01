const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
const connectDB = async () => {
    try{
        await mongoose.connect(db, {
            usenewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Database connected..')
    }catch (err) {
        console.error(err.message);
        process.exit();
    }
}


module.exports = connectDB;

