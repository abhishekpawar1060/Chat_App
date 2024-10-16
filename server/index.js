const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/connectionDB');
const router = require("./routes/index");


const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());

const PORT = process.env.PORT || 4000;

app.use('/api', router);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server running at", PORT);
    })
})


