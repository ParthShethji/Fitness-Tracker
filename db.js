import mongoose from "mongoose";
const connectdb = async () =>{
    try {
        const connect = await mongoose.connect("mongodb+srv://ParthShethji:amX94gO4vEE6Ydtd@fitness.bjs08jn.mongodb.net/Fitness")
        console.log(`connected to mongodb at: ${connect.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}

export default connectdb