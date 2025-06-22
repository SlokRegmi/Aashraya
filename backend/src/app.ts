import express, { Request, Response } from "express"
import morgan from "morgan"
import { CorsMiddleware } from "./middleware/cors.middleware"
const app=express()


app.use(morgan("dev"))
app.use(CorsMiddleware)
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/",(req:Request,res:Response)=>{
    res.send("<>Hello world</>")
})

export default app;