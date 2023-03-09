import { ValidUserType } from '../enums/ValidUsers.enum';
export const USERS = [
    {
        fullName: 'Leo Erick Pereyra Rodriguez',
        email: 'leoerickp@gmail.com',
        password: '123456',
        userType: ValidUserType.admin,
        isActive: true
    },
    {
        fullName: 'Erick Pereyra',
        email: 'erick@google.com',
        password: '123456',
        userType: ValidUserType.user,
        isActive: true
    },
    {
        fullName: 'Fabiana kosky',
        email: 'koskky@google.com',
        password: '123456',
        userType: ValidUserType.user,
        isActive: false
    },
    {
        fullName: 'Juan Perez',
        email: 'juanperez@google.com',
        password: '123456',
        userType: ValidUserType.user,
        isActive: true
    },
]

