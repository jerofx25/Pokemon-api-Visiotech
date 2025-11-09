
import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction){

    console.error(err);

    const status = err.status || 500;
    const message = err.message || "Internal Server Error";

    const response: any = { error: message };

    if (process.env.NODE_ENV !== "production" && err.stack) {
        response.stack = err.stack;
    }

    return res.status(status).json(response);
    
}