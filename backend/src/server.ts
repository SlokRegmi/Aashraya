import dotenv from "dotenv";
import http from "http";
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

import app from "./app";
import logger from "./config/logger";
const PORT=process.env.port || 8000
const server=http.createServer(app)

const connectApp=async()=>{
server.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
    logger.info(`HTTP Server rusnning on port ${PORT}`);


})
}

const shutdown=()=>{
    console.log("Shutting Down server")
    server.close(()=>{
        console.log("Server has been shutdown")
        process.exit(0)
    })
}
process.on("SIGINT",shutdown)
process.on("SIGTERM",shutdown)

connectApp()
