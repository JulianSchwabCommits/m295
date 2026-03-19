import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: "/workspaces/m295/aufgabe7-1/.env" });

const app = express();

const USERNAME = process.env.AUTH_USER;
const PASSWORD = process.env.AUTH_PASS;


const basicAuth = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Basic ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
    const [username, password] = credentials.split(":");

    if (username === USERNAME && password === PASSWORD) {
        return next();
    }

    return res.status(401).json({ message: "Invalid credentials" });
};


app.get("/public", (req, res) => {
    res.json({ message: "This is public content" });
});

app.get("/private", basicAuth, (req, res) => {
    res.json({ message: "This is private content" });
});

console.log(`Username: ${USERNAME}, Password: ${PASSWORD}`);
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
