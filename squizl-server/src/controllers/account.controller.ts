import express from 'express';
import { getAccount } from '../providers/account.provider';

const router = express.Router();

router.get('', async (req, res) => {
    const result = await getAccount(req.currUser.userId);

    if (result.isSucc()) res.status(200).send(result.value);
    else res.status(result.value.httpStatus).send(result.value.message);
});

export = router;
