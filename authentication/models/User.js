import { DataTypes } from "sequelize";
import { createDBConnection } from "../utils/dbConn.js";

const connection = createDBConnection();

export const User = connection.define(
    'users',{
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true
        },
        first_name:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        last_name:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        password:{
            type: DataTypes.STRING,
            allowNull:false,
        },
    },
    {
            timestamps: false,
    },
);