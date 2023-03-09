import { ValidUserType } from '../enums/ValidUsers.enum';

export const validUser = (userType: ValidUserType) => {
    if (!(Object.values<string>(ValidUserType).includes(userType))) {
        throw new Error('userType must be enum user or admin');
    }
    return true;
}