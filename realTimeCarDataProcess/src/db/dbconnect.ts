import mongoose from 'mongoose';


const dbConnect = async(db: string) =>{
    try{
        await mongoose.connect(db);
        console.log("MongoDB connected");
    }catch(err: any){
        console.log(err.message);
        process.exit(1);
    }
}
export default dbConnect