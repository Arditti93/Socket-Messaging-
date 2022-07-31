require("./db/connection"); // Run db connection

const express = require("express")
const userRouter = require("./login/routes")
const app = express();
const port = process.env.PORT || 5001;

app.use(express.json()); // parse req and json and sends all responses as json 

app.use(userRouter)

app.listen(port, () =>{
    console.log(`Listening on port ${port}`);
})