const mongoose = require('mongoose');

main().catch(err =>console.log("Error in connecting to database", err));

async function main(){
    await mongoose.connect('mongodb://localhost/codeial_development');
    console.log("Successfully connected to db!");
}
// const db = mongoose.connection;
// module.exports = db;
