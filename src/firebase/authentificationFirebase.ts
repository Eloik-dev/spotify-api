import admin from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';

var serviceAccount = require('./firebase.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// Extend the Request interface to include the uid property 
export interface FirebaseRequest extends Request {
    uid?: string;
}

export const firebaseAuthentication = async (
    req: FirebaseRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    console.log('start firebaseAuthentication');
    if (authHeader) {
        const idToken = authHeader.split(' ')[1];
        console.log('idToken:', idToken);
        admin
            .auth()
            .verifyIdToken(idToken)
            .then(function (decodedToken) {
                console.log('decodedToken:', decodedToken);
                req.uid = decodedToken.uid;
                next();
            })
            .catch(function (error) {
                console.log('catch Error:', error);
                const errorMessage = {
                    status: 403,
                    error: error,
                };
                res.status(403).send(errorMessage);
                res.end();
            });
    } else {
        console.log('no header');
        const errorMessage = {
            status: 401,
            error: 'Missing authorization header',
        };
        res.sendStatus(401);
        res.end();
    }
};