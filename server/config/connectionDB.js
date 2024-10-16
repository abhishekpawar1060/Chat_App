const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGOO_URI);

        console.log("Connected Successfully to database!");
        
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("Connected Successfully to Database"); 
        })
        connection.on('error', (error) => {
            console.log("Something went's wrong while connection to mongodb", error);
            
        })
    }catch(err){
        console.log("Something went's wrong", err);
        
    }
}

module.exports = connectDB;
