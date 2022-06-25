const express = require('express')

const app = express()
const port = process.env.PORT || 3001;

app.get('/', (req, res, next) => {
    res.send('hello world!');
});

app.listen(port, function () {
    console.log('server on! ' + port);
});
