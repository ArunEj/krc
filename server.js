const express = require('express');
const path = require('path')
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static('./dist/KRC'))

app.get('/', (req, res) =>  res.sendFile(path.resolve('dist/KRC/index.html')));

app.listen(port, () => {
    console.log("Server is listening on port "+port);
});