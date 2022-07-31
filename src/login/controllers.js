const User = require("./models") 

exports.signUp = async(req, res) => {
    console.log("ran")
    console.log(req.body)
    try {
        const newUser = await User.create(req.body);
        res.status(200).send({ user: newUser.username });
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: error.message });
    }
} 