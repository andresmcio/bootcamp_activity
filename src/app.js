const express = require('express');
const app = express();
const { port, callback } = require('./modules/port');
const method = require('method-override');

app.use(express.urlencoded({ extended: false }));
app.use(method('_method'));

app.listen(port, callback(port));

app.use(require('./routes/main.routes'));