
import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction){

    console.log(err);

    const status = err.status || 500;
    const message = err.message || "Internal Server Error"

    return res.status(status).json({error: message});
    
}