const mongoose = require("mongoose") 

const connections = new mongoose.Schema ({ 
    connectionId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    }
})

const Connections = mongoose.model("users", connections );
module.exports = Connections;