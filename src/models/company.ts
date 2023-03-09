import { DataTypes } from "sequelize";
import { db } from "../database/connectiondb";

export const Company = db.define("company", {
    NIT: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false
    },
    companyName: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(50),
        allowNull: true,
    }
});