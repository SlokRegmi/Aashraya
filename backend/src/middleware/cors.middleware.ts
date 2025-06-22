


import cors from "cors";
import { RequestHandler } from "express";
import { corsOptions } from "../config/cors";


export const CorsMiddleware:RequestHandler=cors(corsOptions)