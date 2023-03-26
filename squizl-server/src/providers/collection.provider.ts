import { PrismaClient } from '@prisma/client';
import { CollectionModel } from '../models/collection.model';
import { HttpError } from '../models/http-error.model';
import { QuestionModel } from '../models/question.model';
import { fail, Result, success } from '../models/result.model';
import { getQuestion } from './question.provider';

const prisma = new PrismaClient();

export async function addCollection (name: string, ownerId: number): Promise<Result<CollectionModel>> {
    try {
        const collection = await prisma.collection.create({
            data: {
                name: name,
                ownerId: ownerId
            }
        });

        return success(new CollectionModel(collection.id, collection.name, collection.ownerId));
    } catch (err) {
        return fail(new HttpError('Failed to create new Collection', 500));
    }
}

export async function getCollection (collectionId: number): Promise<Result<CollectionModel>> {
    try {
        const collection = await prisma.collection.findUnique({
            where: {
                id: collectionId
            }
        });

        if (!collection) return fail(new HttpError('Collection does not exist', 404));

        const questionIds = (await prisma.questionOnCollection.findMany({
            where: {
                collectionId: collectionId
            },
            select: {
                questionId: true
            }
        })).map(qc => qc.questionId);

        const questions: Array<QuestionModel> = [];
        for (const id of questionIds) {
            const res = await getQuestion(id);
            if (res.isSucc()) questions.push(res.value);
        }

        return success(new CollectionModel(collection.id, collection.name, collection.ownerId, questions));
    } catch (err) {
        return fail(new HttpError('Failed to get Collection', 500));
    }
}

export async function deleteCollection (collectionId: number): Promise<Result<null>> {
    try {
        const collection = await prisma.collection.delete({
            where: {
                id: collectionId
            }
        });

        if (collection) return success(null);
        else return fail(new HttpError('Collection does not exist', 404));
    } catch (err) {
        return fail(new HttpError('Failed to delete collection', 500));
    }
}

export async function getAllCollectionsOfUser (userId: number): Promise<Result<Array<CollectionModel>>> {
    try {
        const ids = (await prisma.collection.findMany({
            where: {
                ownerId: userId
            },
            select: {
                id: true
            }
        })).map(col => col.id);

        const collections: Array<CollectionModel> = [];
        for (const id of ids) {
            const res = await getCollection(id);
            if (res.isSucc()) collections.push(res.value);
        }

        return success(collections);
    } catch (err) {
        return fail(new HttpError('Failed to get all collections of the user', 500));
    }
}

export async function isOwner (collectionId: number, ownerId: number): Promise<Result<boolean>> {
    try {
        const res = await prisma.collection.count({
            where: {
                id: collectionId,
                ownerId: ownerId
            }
        });

        if (res > 0) return success(true);
        else return success(false);
    } catch (err) {
        return fail(new HttpError('Failed to get check for owner', 500));
    }
}

export async function addQuestionToCollection (collectionId: number, questionId: number): Promise<Result<CollectionModel>> {
    try {
        await prisma.questionOnCollection.create({
            data: {
                collectionId: collectionId,
                questionId: questionId
            }
        });

        const res = await getCollection(collectionId);
        if (res.isSucc()) return success(res.value);
        else return fail(res.value);
    } catch (err) {
        return fail(new HttpError('Failed to add question to collection', 500));
    }
}

export async function deleteQuestionInCollection (collectionId: number, questionId: number): Promise<Result<null>> {
    try {
        const res = await prisma.questionOnCollection.delete({
            where: {
                collectionId_questionId: { collectionId: collectionId, questionId: questionId }
            }
        });

        if (res) return success(null);
        else return fail(new HttpError('question collection connection does not exist', 404));
    } catch (err) {
        return fail(new HttpError('Failed to delete question collection connection', 500));
    }
}
