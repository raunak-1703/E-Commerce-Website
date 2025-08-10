import mongoose from "mongoose";
const connectdb= async (url)=>{
    try {
        await mongoose.connect(url)
        console.log('Mongodb Connected')
    } catch (error) {
        console.log(error.message)
    }
}
export default connectdb