const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bot = require("./bot/index.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
    // res.sendFile("index.html", { root: __dirname });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
