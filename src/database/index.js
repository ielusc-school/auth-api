const mongoose = require('mongoose');
const URL_MONGOATLAS = 'mongodb+srv://xpto123:xpto123@cluster0-sgcno.mongodb.net/test?retryWrites=true&w=majority'
const mongo = process.env.MONGODB || URL_MONGOATLAS

mongoose
 .connect(mongo, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   })
   .then(() => {
      console.log('connected with MongoATlas');
   })
   .catch(() => {
       console.log('error this connexion');
   });

 mongoose.Promise = global.Promise;
 module.exports = mongoose;