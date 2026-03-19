import express from 'express';
import session from 'express-session';

const app = express();

app.use(express.json());
app.use(session({
    secret: 'eljkasdff',
    resave: false,
    saveUninitialized: true,
}));

app.post('/name', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'name is required' });
    }
    req.session.name = name;
    res.status(200).json({ message: `Name ${name} saved in session` });
});

app.get('/name', (req, res) => {
    if (!req.session.name) {
        return res.status(404).json({ error: 'No name found in session' });
    }
    res.status(200).json({ name: req.session.name });
});

app.delete('/name', (req, res) => {
    if (!req.session.name) {
        return res.status(404).json({ error: 'No name found in session' });
    }
    delete req.session.name;
    res.status(200).json({ message: 'Name deleted from session' });
});

app.listen(3000, () => {
    console.log("lessgo");
});