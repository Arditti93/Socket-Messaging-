const mongoose = require("mongoose") 

const msgSchema = new mongoose.Schema ({ 
    msg: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    connectionId: {
        type: String,
        required: true
    }
})

const Msg = mongoose.model("Messages", msgSchema );
module.exports = Msg; 

