import express from 'express';
import { areNotNullOrEmpty, areNumbers } from '../helpers/body-checker.helper';
import { isOwnerMiddle } from '../middlewares/collection-owner.middleware';
import { addCollection, deleteCollection, getAllCollectionsOfUser, getCollection } from '../providers/collection.provider';
import questionRouter from './collection/question.controller';

const router = express.Router();

router.use('/question', questionRouter);

router.get('/:collectionId', async (req, res) => {
    if (areNumbers([req.params.collectionId])) {
        const collectionId: number = +req.params.collectionId;

        const result = await getCollection(collectionId);

        if (result.isSucc()) res.status(200).send(result.value);
        else res.status(result.value.httpStatus).send(result.value.message);
    } else res.status(400).send({ message: 'collectionId parameter must be numeric' });
});

router.get('', async (req, res) => {
    const result = await getAllCollectionsOfUser(req.currUser.userId);

    if (result.isSucc()) res.status(200).send(result.value);
    else res.status(result.value.httpStatus).send(result.value.message);
});

router.post('', async (req, res) => {
    const { name } = req.body;

    if (areNotNullOrEmpty([name])) {
        const result = await addCollection(name, req.currUser.userId);

        if (result.isSucc()) res.status(200).send(result.value);
        else res.status(result.value.httpStatus).send(result.value.message);
    } else res.status(400).send({ message: 'Name in body must be given' });
});

router.delete('/:collectionId', isOwnerMiddle, async (req, res) => {
    if (areNumbers([req.params.collectionId])) {
        const collectionId: number = +req.params.collectionId;

        const deleteRes = await deleteCollection(collectionId);

        if (deleteRes.isSucc()) res.status(200).send({ message: 'Deleted successfully' });
        else res.status(deleteRes.value.httpStatus).send(deleteRes.value.message);
    } else res.status(400).send({ message: 'collectionId parameter must be numeric' });
});

export = router;
