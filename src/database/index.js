const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const mongo = process.env.DATABASE_MATLAS


mongoose
 .connect(mongo, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true,
     useFindAndModify: false,
   })
   .then(() => {
      console.log(`Connected with MongoAtlas ${mongo}`);
   })
   .catch(() => {
       console.log('error this connexion');
   });

 mongoose.Promise = global.Promise;
 module.exports = mongoose;