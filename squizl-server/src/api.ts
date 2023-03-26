import express from 'express';
import { router as authRouter } from './controllers/auth.controller';
import lobbyRouter from './controllers/lobby.controller';
import accountRouter from './controllers/account.controller';
import userRouter from './controllers/user.controller';
import questionRouter from './controllers/question.controller';
import collectionRouter from './controllers/collection.controller';
import { authResponse, isAuth } from './middlewares/auth.middleware';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/lobby', isAuth, authResponse, lobbyRouter);
router.use('/account', isAuth, authResponse, accountRouter);
router.use('/user', isAuth, authResponse, userRouter);
router.use('/question', isAuth, authResponse, questionRouter);
router.use('/collection', isAuth, authResponse, collectionRouter);

export = router;
