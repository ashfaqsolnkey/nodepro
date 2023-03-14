const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config({path:''})

const database = mongoose.connect(
  process.env.MONGODB_URL,
  { useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false,
    useCreateIndex: true
  },
  (error) => {
    if (!error) {
      console.log("connected to the mongoDB");
    } else {
      console.log("connection to mongoDB failed \n" + error);
    }
  }
);

module.exports = database;
