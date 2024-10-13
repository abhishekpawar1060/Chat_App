const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

const PORT = process.env.PORT || 4000;


app.listen(PORT, () => {
    console.log("Server running at", PORT);
    
})

app.get('/', (req, res) => {
    res.json({
        message: "Server is Running"
    })
})