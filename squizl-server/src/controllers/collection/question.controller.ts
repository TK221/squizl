import express from 'express';
import { areNumbers } from '../../helpers/body-checker.helper';
import { isOwnerMiddle } from '../../middlewares/collection-owner.middleware';
import { addQuestionToCollection, deleteQuestionInCollection } from '../../providers/collection.provider';

const router = express.Router();

router.post('/:collectionId', isOwnerMiddle, async (req, res) => {
    const { questionId } = req.body;
    if (areNumbers([req.params.collectionId, questionId])) {
        const collectionId: number = +req.params.collectionId;

        const addRes = await addQuestionToCollection(collectionId, questionId);

        if (addRes.isSucc()) res.status(200).send(addRes.value);
        else res.status(addRes.value.httpStatus).send(addRes.value.message);
    } else res.status(400).send({ message: 'CollectionId parameter and body questionId must be numeric' });
});

router.delete('/:collectionId/:questionId', isOwnerMiddle, async (req, res) => {
    if (areNumbers([req.params.collectionId, req.params.questionId])) {
        const collectionId: number = +req.params.collectionId;
        const questionId: number = +req.params.questionId;

        const addRes = await deleteQuestionInCollection(collectionId, questionId);

        if (addRes.isSucc()) res.status(200).send({ message: 'Question removed successfully' });
        else res.status(addRes.value.httpStatus).send(addRes.value.message);
    } else res.status(400).send({ message: 'CollectionId and questionId parameter must be numeric' });
});

export = router;
