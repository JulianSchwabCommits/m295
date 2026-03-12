import express from "express"
const app = express();
const port = 3005;


// 1 
app.get('/now', (req, res) => {
    res.send(new Date());
});

// 2
app.get('/zli', (req, res) => {
    res.redirect('https://www.zli.ch');
})

// 3
app.get('/name', (req, res) => {
    const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry', 'Iris', 'Jack', 'Karen', 'Leo', 'Mia', 'Noah', 'Olivia', 'Paul', 'Quinn', 'Rachel', 'Sam', 'Tina', 'Uma'];
    const random = names[Math.floor(Math.random() * names.length)];
    res.send(random);
});

// 4
app.get('/html', (req, res) => {
    res.sendFile('/workspaces/m295/aufgabe3-3/index.html');
});
// 5

app.get('/image', (req, res) => {
    res.sendFile('/workspaces/m295/aufgabe3-3/mark-zuckerberg.png');
});
// 6
app.get('/teapot', (req, res) => {
    res.status(418).send("im a teapot");
});
// 7
app.get('/user-agent', (req, res) => {
    const userAgent = req.headers['user-agent'];
    res.send("Your browser is: " + userAgent.toString());
});
// 8
app.get('/secret', (req, res) => {
    res.status(403).send("forbidden");
});
// 9
app.get('/xml', (req, res) => {
    res.sendFile('/workspaces/m295/aufgabe3-3/index.xml');
});
// 10
app.get('/me', (req, res) => {
    res.json({
        firstname: 'John',
        lastname: 'Doe',
        age: 30,
        location: 'Zurich'
    });
})

app.listen(port, () => {
    console.log("Running on Port: " + port.toString());
});