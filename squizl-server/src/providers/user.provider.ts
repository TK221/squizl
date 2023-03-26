import { PrismaClient } from '@prisma/client';
import { UserModel } from '../models/user.model';
import { HttpError } from '../models/http-error.model';
import { Result, fail, success } from '../models/result.model';

const prisma = new PrismaClient();

export async function createUser (accountId: number, username: string): Promise<Result<UserModel>> {
    try {
        const user = await prisma.user.create({
            data: {
                accountId: accountId,
                username: username
            }
        });

        return success(new UserModel(user.accountId, user.username));
    } catch (err) {
        return fail(new HttpError('Failed to create user', 500));
    }
}

export async function getUser (accountId: number): Promise<Result<UserModel>> {
    try {
        const user = await prisma.user.findUnique({
            where: {
                accountId: accountId
            }
        });

        if (user) return success(new UserModel(user.accountId, user.username));
        else return fail(new HttpError('User does not exist', 404));
    } catch (err) {
        return fail(new HttpError('Failed to get user', 500));
    }
}
