import {Request, Response, NextFunction} from "express";
import User from "../entity/User";

export interface RequestWithUser extends Request {
    user: User
}

export default async (req: RequestWithUser, res: Response, next: NextFunction) => {
    let authHeader = req.header('Authorization');
    if (authHeader == null) {
        return res.status(401).json({
            message: "Unauthenticated",
        })
    }
    let authToken = authHeader.split(' ').pop();

    if (authToken == null || authToken == authHeader) {
        return res.status(401).json({
            message: "Unauthenticated",
        })
    }

    let user = await User.findOne({
        where: {authToken}, select: {
            id: true,
            username: true,
            authToken: true,
        }
    });

    if (user == null) {
        return res.status(401).json({
            message: "Unauthenticated",
        })
    }
    req.user = user;
    next();
}
