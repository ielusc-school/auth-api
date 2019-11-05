const express = require('express');
const User = require('../../models/user');
const router = express.Router();
// importando bcrypt
const bcrypt = require('bcrypt');
// importa jwt 
const jwt = require('jsonwebtoken');
// importa hash da aplicação
const authConfig = require('../config/auth');


//criando a rota de registro
router.post('/register', async(req, res) => {
    try {
      // req.body => pega as informações do usuário, inseridas pelo browser
      const user = await User.create(req.body);
      console.log(user);
      user.password = undefined;
      return res.send({ user });
    } catch (err) {
      console.log(err);
      return res.status(400).send({error: 'Erro ao registrar o usuário'});
    }
});

router.post('/authenticate', async (req, res) => {
  // pegando o email do user
  const { email, password } = req.body;
  const user = await User.findOne({email}).select('+password');

  if(!user) {
    return res.status(400).send({error: 'Usuário não encontrado'});
  }

  if(!await bcrypt.compare(password, user.password)) {
    return res.status(400).send({error: 'Senha não confere'});
  }

  const token = jwt.sign({id: user.id}, authConfig.secret, {
    expiresIn: 86400 
  });

  user.password = undefined;
  console.log(user);
  res.send({ user, token });
});

router.post('/forgot_password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log(user);

    // validando usuario na base
    if(!user) {
      return res.status(400).send({
        message: 'Usuário não encontrado, deseja registrar na base?'
      });
    }

    const token = crypto.randomBytes(20).toString('hex');

    const now = new Date();
    now.setHours(now.getHours() +1);
    await User.updateOne({ _id: user.id }, {
      passwordResetToken: token,
      passwordResetExpires: now,
    });

  }catch(err) {
    return res.status(400).send({message: 'Esse e-mail não foi encontrado em nossa base.'})
  }
});

module.exports = app => app.use('/auth', router);