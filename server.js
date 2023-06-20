import express from "express";
import morgan from "morgan";
import connectdb from "./db.js";
import authroutes from "./routes/authroute.js"
import cors from 'cors'

const app = express();
const port = 8000

//database config
connectdb()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth', authroutes)

//rest api
app.get("", (req, res)=>{
    res.send("<h1>app</h1>")
})

// listen  
app.listen(port, ()=>{
    console.log("server started")
})
// mongodb password - amX94gO4vEE6Ydtd