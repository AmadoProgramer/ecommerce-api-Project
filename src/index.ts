import "./infrastructure/config/environment-vars";
import app from './infrastructure/web/app';
import { ServerBoostrap } from './infrastructure/bootstrap/server.bootstrap';
import { connectDB } from "./infrastructure/config/data-base";

const server = new ServerBoostrap(app);

(async () =>{
    try{
    //Connect to the database
        await connectDB();   //Initialize server   
        const instances = [server.init()];
        await Promise.all(instances);        
    } catch (error) {
        console.error(error);
        process.exit(1); //Exit the process with failure
    }    
}
)();