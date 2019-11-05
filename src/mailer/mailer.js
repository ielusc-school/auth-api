const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemail-express-handlebars');


// alterei para JSON para JS
const { host, port, user, pass } = require('../config/mail.js');

const transport = nodemailer.createTransport({
    host, port,
    auth: { user,pass }
});

const handlebarsOptions = {
    viewEngine: {
        extName: '.html',
        partialDir: path.resolve('./src/resources/auth'),
        layoutDir: path.resolve('./src/resources/auth'),
        defaultLayout: 'forgot_password.html',
    },
    viewpath: path.resolve('./src/resources/auth/'),
    extName: '.html',
};

transport.use('compile', hbs(handlebarsOptions));
module.exports = transport;