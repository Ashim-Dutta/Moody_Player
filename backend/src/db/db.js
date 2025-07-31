const mongoose = require('mongoose')

function connectDB() { 
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => { 
            console.log('connected to the MongoDB');
        })
        .catch((error) => { 
            console.log("something went wrong");
        })
}

module.exports = connectDB