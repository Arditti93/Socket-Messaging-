const { Router } = require ("express") 
const { signUp } = require("./controllers");

const userRouter = Router() 

userRouter.post("/user", signUp)


module.exports = userRouter;
