import { NextFunction, Request, Response } from 'express';
import { areNumbers } from '../helpers/body-checker.helper';
import { isOwner } from '../providers/collection.provider';

export async function isOwnerMiddle (req: Request, res: Response, next: NextFunction) {
    if (areNumbers([req.params.collectionId])) {
        const collectionId = +req.params.collectionId;
        const isOwnerRes = await isOwner(collectionId, req.currUser.userId);

        if (isOwnerRes.value) {
            next();
        } else res.status(403).send({ message: 'Not owner of the collection' });
    } else res.status(400).send({ message: 'collectionId parameter must be numeric' });
}
