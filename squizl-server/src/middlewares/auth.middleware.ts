import { NextFunction, Request, Response } from 'express';
import expressJwt from 'express-jwt';

const secret = process.env.JWT_SECRET || 'secret';

export const isAuth = expressJwt({
    secret: secret,
    algorithms: ['HS256'],
    requestProperty: 'currUser'
});

export function authResponse (err: Error, req: Request, res: Response, next: NextFunction) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Unauthorized');
    } else next();
}
