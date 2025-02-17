import { NextRequest, NextResponse } from "next/server";
import { Request, Response } from "express";

export function createMiddleware(middleware: any, handler: any) {
    return (req: NextRequest, res: NextResponse) => {
        const expressReq = req as unknown as Request;
        const expressRes = res as unknown as Response;
        
        return middleware(expressReq, expressRes, () => handler(expressReq, expressRes));
    };
}
