
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;


const connect = async () => {
    const connectionState = mongoose.connection.readyState;

    if(connectionState === 1 ) {
        console.log("Already connected")
        return ;
    }
    if(connectionState === 2 ) {
        console.log("connecting ....")
        return ;
    }

    try {
        mongoose.connect(MONGO_URI!, {
            dbName:"NextBE-tutorial",
            bufferCommands:true,
        })

        console.log("Connected!!!!")
    } catch (error : any) {
        console.log("Error : " , error);
        throw new Error("Error : ", error)
    }
}

export default connect;