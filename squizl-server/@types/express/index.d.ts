import { RequestUserModel } from '../../src/models/request-user.model';

declare global{
    namespace Express {
        interface Request {
            currUser: RequestUserModel
        }
    }
}
