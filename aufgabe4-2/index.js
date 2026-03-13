import express from "express";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let names = [];
let me = {
    name: "Julian",
    age: 17,
    city: "Zurich"
};


app.get("/now", (req, res) => {
    const tz = req.query.tz;

    const time = new Date().toLocaleTimeString("de-CH", {
        timeZone: tz
    });

    res.type("text/plain");
    res.send(time);
});


app.post("/names", (req, res) => {
    const name = req.body.name;

    names.push(name);

    res.status(201).send(names);
});


app.delete("/names", (req, res) => {
    const name = req.query.name;

    names = names.filter(n => n !== name);

    res.status(204).send();
});


app.get("/secret2", (req, res) => {
    const auth = req.headers.authorization;

    if (auth === "Basic aGFja2VyOjEyMzQ=") {
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});


app.get("/chuck", async (req, res) => {
    const name = req.query.name || "Chuck Norris";

    const response = await fetch("https://api.chucknorris.io/jokes/random");
    const data = await response.json();

    const joke = data.value.replaceAll("Chuck Norris", name);

    res.json({ joke });
});


app.patch("/me", (req, res) => {
    Object.assign(me, req.body);

    res.json(me);
});


app.listen(port, () => {
    console.log("Running on port " + port);
});

