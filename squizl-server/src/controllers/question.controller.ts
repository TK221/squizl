import express from 'express';
import { areNotNullOrEmpty, areNumbers } from '../helpers/body-checker.helper';
import { addQuestion, getAllQuestions } from '../providers/question.provider';

const router = express.Router();

router.get('', async (req, res) => {
    const result = await getAllQuestions();

    if (result.isSucc()) res.status(200).send(result.value);
    else res.status(result.value.httpStatus).send({ message: result.value.message });
});

router.post('', async (req, res) => {
    const { question, answers, correctAnswer } = req.body;

    if (areNotNullOrEmpty([question]) && areNumbers([correctAnswer]) && Array.isArray(answers) && areNotNullOrEmpty(answers)) {
        const result = await addQuestion(question, answers, +correctAnswer);

        if (result.isSucc()) res.status(200).send(result.value);
        else res.status(result.value.httpStatus).send({ message: result.value.message });
    } else res.status(400).send({ messgae: 'Body is wrong' });
});

export = router;
