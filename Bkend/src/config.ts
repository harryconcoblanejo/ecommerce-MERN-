
import dotenv from 'dotenv';

dotenv.config({path:'./src/.env'});





export default {
    MONGO_DATABASE:process.env.MONGO_DATABASE || "eCommerceDb",
    MONGO_USER:process.env.MONGO_USER || "admin",
    MONGO_PASSWORD:process.env.MONGO_PASSWORD || "admin",
    MONGO_HOST:process.env.MONGO_HOST || "localhost",
    PORT:process.env.PORT || 3000,
    SECRET_KEY:process.env.SECRET_KEY || "secret_key",
    ACCESS_TOKEN:process.env.ACCESS_TOKEN || "APP_USR-6652127946432269-082610-5f9465873c82af2d4621d81b4d0a5d0f-813856487"


}