import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken"

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ");
    try {
        const { sub } = verify(token, "1095a312bd73a953ba36b5f92fdb22e0") as IPayload;

        request.user_id = sub;

    } catch (error) {
        return response.status(401).end();
    }


    return next();
}