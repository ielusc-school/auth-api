const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyparser = require('body-parser');

app.use(bodyparser.json());
app.set(bodyparser.urlencoded({extended:false}));

app.get('/', (req, res) => {
  res.send('JWT');
});

require('./app/controllers/index')(app);
app.listen(port);