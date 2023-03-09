import { DataTypes } from 'sequelize';
import { db } from '../database/connectiondb';
import { ValidUserType } from '../enums/ValidUsers.enum';
export const User = db.define("user", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    fullName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(45),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    urlPhoto: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userType: {
        type: DataTypes.ENUM('user', 'admin'),
        allowNull: false,
        defaultValue: ValidUserType.user
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
},
    {
        defaultScope: {
            attributes: { exclude: ['password'] }
        },
        scopes: {
            withPassword: {
                attributes: { include: ['password'] }
            }
        }
    }
)