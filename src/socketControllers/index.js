const Msg = require("../models/models") 
const Connections = require("../models/connectionModel")

exports.addConnection = async (connectionId, sub) => {
    let connection = {
      "connectionId": connectionId,
      "username": sub
    } 
    try{
      const newConnection = await Connections.create(connection)
    } catch (error) {
      console.log(error)
    }
  }

exports.removeConnection = async (connectionId) => {
    try{
        const connection =  await Connections.deleteOne({connectionId: connectionId})
        console.log(connection)
    } catch (error) {
        console.log(error)
    }
} 

exports.findConnection = async (key, filter) => {
  try {
    return await Connections.findOne({[key]: filter})
  } catch (error) {
    console.log(error)
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
          return u
        })
        output = result
    } catch (error) {
        output  = error
    } finally {
        return output
    }
} 