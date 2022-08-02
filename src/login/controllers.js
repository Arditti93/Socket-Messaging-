const User = require("./models") 

exports.signUp = async(req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(200).send({ user: newUser.username });
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: error.message });
    }
} 