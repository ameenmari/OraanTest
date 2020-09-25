

require("dotenv").config();
import express from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import api from "./routes/index.";


const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());

mongoose
    .connect("mongodb+srv://ameenmari:3s9kMMYHZ2tyBPw3@cluster0.60rwu.gcp.mongodb.net/<newdb>?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log("Database connected!"))
    .catch((err) => console.error(err));

app.get("/", (req, res) => {
    return res.status(200).send("ok");
});

app.use("/api", api);

app.listen(5000, () => {
    console.log("Server Running on port 5000");
});
