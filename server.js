const express = require('express');
const app = express();
app.use(express.static(__dirname + '/release'));
app.listen(3000, function () {
    console.log('App listen http://localhost:3000');
});