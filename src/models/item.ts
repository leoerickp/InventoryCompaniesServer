import { DataTypes } from "sequelize";
import { db } from "../database/connectiondb";
import { Company } from './company';

export const Item = db.define("inventory", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    itemName: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    NIT: {
        type: DataTypes.STRING(20),
        allowNull: false,
    }
});

Company.hasMany(Item, { foreignKey: 'NIT', onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
Item.belongsTo(Company, { foreignKey: 'NIT' });