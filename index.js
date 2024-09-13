const express = require('express') // Import Express framework
const mongoose = require('mongoose')// Import Mongoose
const bodyParser = require('body-parser') // Import Body-parser
const dotenv = require('dotenv') // Import dotenv
const route = require ('./routes/userRoute.js')// Import routes

const app = express(); // Initialize Express app

app.use(bodyParser.json()); // Use Body-parser middleware

dotenv.config(); // Load environment variables

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database connected successfully.");
        app.listen(PORT, () => {
            console.log(`Server is running on port : ${PORT}`);
        });
    })
    .catch((error) => console.log(error));

app.use("/api/user", route);
