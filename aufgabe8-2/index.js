import express from "express";

const app = express();

app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.url} - ${duration}ms`);
    });
    next();
});


app.use((req, res, next) => {
    setTimeout(() => {
        const token = req.header('x-auth-token');
        if (!token) {
            res.status(401).send('Unauthorized');
        } else {
            next();
        }
    }, 2000);
});

app.get('/ping', (req, res) => {
    res.send("pong");
})

app.post('/echo', (req, res) => {
    res.send("echoing back");
})


app.listen(3000);