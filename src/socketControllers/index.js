const Msg = require("../models/models") 
const Connections = require("../models/connectionModel")

exports.addConnection = async (connectionId) => {
    let connection = {
      "connectionId": connectionId,
      "username": "Placeholder"
    } 
    try{
      const newConnection = await Connections.create(connection)
    } catch (error) {
      console.log(error)
    }
  }

exports.removeConnection = async (connectionId) => {
    try{
        await Connections.deleteOne({connectionId: connectionId})
    } catch (error) {
        console.log(erorr)
    }
}
  
exports.saveMsg = async (msg, socketId, username) =>{  
    let msgObj = {
      "msg": msg,
      "username": username,
      "connectionId": socketId
    }
    try {
      const newMsg = await Msg.create(msgObj);
    } catch (error) {
      console.log(error)
    }
} 

exports.listConnections = async () => {
    let output
    try {
        const listUsers = await Connections.find({});
        const result = listUsers.map((u) => {
          return u.connectionId
        })
        output = result
    } catch (error) {
        output  = error
    } finally {
        return output
    }
}