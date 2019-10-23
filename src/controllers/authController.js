const express = require('express');

const User = require('../models/user');
const router = express.Router();


router.post('/register', async(req, res) => {
    try {
      // req.body => pega as informações do usuário, inseridas pelo browser
      const user = await User.create(req.body);
      console.log(user);
      return res.send({ user });
    } catch (err) {
      console.log(err);
      return res.status(400).send({error: 'Erro ao registrar o usuário'});
    }
});

module.exports = app => app.use('/auth', router);