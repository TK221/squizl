import { PrismaClient } from '@prisma/client';
import { HttpError } from '../models/http-error.model';
import { QuestionModel } from '../models/question.model';
import { Result, fail, success } from '../models/result.model';

const prisma = new PrismaClient();

const MAXANSWERS = 10;

/**
 *
 * @param question the question which will be shown
 * @param answers answers in an array. Min 2 answers and max 4
 * @param correctAnswer index of the correct answer
 * @returns result inserted question or error
 */

export async function addQuestion (question: string, answers: string[], correctAnswer: number): Promise<Result<QuestionModel>> {
    if (answers.length > 1 && answers.length <= MAXANSWERS && correctAnswer >= 0 && correctAnswer < answers.length) {
        try {
            const newQuestion = await prisma.question.create({
                data: {
                    question: question,
                    correctAnswer: correctAnswer
                }
            });

            for (const answer of answers) {
                await prisma.answer.create({
                    data: {
                        answer: answer,
                        question: {
                            connect: {
                                id: newQuestion.id
                            }
                        }
                    }
                });
            }

            const res = (await prisma.answer.findMany({
                where: {
                    questionId: newQuestion.id
                }
            })).map(answ => answ.answer);

            return success(new QuestionModel(newQuestion.id, newQuestion.question, res, newQuestion.correctAnswer));
        } catch (err) {
            return fail(new HttpError('Failed to create new question', 500));
        }
    } else return fail(new HttpError('Question is not correct', 400));
}

export async function getQuestion (questionId: number): Promise<Result<QuestionModel>> {
    try {
        const question = await prisma.question.findUnique({
            where: {
                id: questionId
            }
        });

        const answers = (await prisma.answer.findMany({
            where: {
                questionId: questionId
            }
        })).map(answ => answ.answer);

        if (question) return success(new QuestionModel(question.id, question.question, answers, question.correctAnswer));
        else return fail(new HttpError('Question does not exist', 404));
    } catch (err) {
        return fail(new HttpError('Failed to get question', 500));
    }
}

export async function getAllQuestions (): Promise<Result<Array<QuestionModel>>> {
    try {
        const res: Array<QuestionModel> = [];

        const questions = await prisma.question.findMany();

        for (const question of questions) {
            const answers = (await prisma.answer.findMany({
                where: {
                    questionId: question.id
                }
            })).map(answ => answ.answer);

            res.push(new QuestionModel(question.id, question.question, answers, question.correctAnswer));
        }

        return success(res);
    } catch (err) {
        return fail(new HttpError('Failed to get all questions', 500));
    }
}

export async function deleteQuestion (questionId: number): Promise<Result<null>> {
    try {
        const question = await prisma.question.delete({
            where: {
                id: questionId
            }
        });

        if (question) return success(null);
        else return fail(new HttpError('Question does not exist', 404));
    } catch (err) {
        return fail(new HttpError('Failed to delete question', 500));
    }
}
