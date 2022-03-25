const mongoose = require('mongoose');


const DBConnection = async () => {
    try {  
        await mongoose.connect(process.env.MONGODB_CONNECTION); 
        console.log(`DataBase connection successfuly !!`);
    } catch (error) {
        console.log(error);
        console.log(`Error in DataBase connection`);
    }
}

module.exports = DBConnection;