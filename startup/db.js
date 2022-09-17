const winston = require('winston');
const mongoose  = require('mongoose');
const config = require('config');

const connectionParams={
  useNewUrlParser: true,
  useUnifiedTopology: true 
}

module.exports = function (){
  const db = config.get('db');
  
  mongoose.connect(db, connectionParams)
  .then(() => console.log(`Connected to ${db} ...`))
  .catch( (err) => {
    console.error(`Error connecting to the database. n${err}`);
  });

}