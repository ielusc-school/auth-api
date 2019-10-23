const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyparser = require('body-parser');

app.use(bodyparser.json());
app.set(bodyparser.urlencoded({extended:true}));


app.get('/', (req, res) => {
  res.send('JWT');
});

require('./controllers/authController')(app);

app.listen(port);