const express = require('express');
const cors = require('cors');
const cookiesParser = require("cookie-parser");
require('dotenv').config();
const connectDB = require('./config/connectionDB');
const router = require("./routes/index");
const { app, server } = require('./socket/index');

// const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());
app.use(cookiesParser());

const PORT = process.env.PORT || 4000;

app.use('/api', router);

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log("Server running at", PORT);
    })
})


