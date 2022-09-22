import {  DataTypes } from "sequelize";
import { db } from "../database";

const UserModel = db.define('users',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate:{
        notEmpty: true
      } 
    },
    userName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
        notEmpty: true
      } 
    }

  },
  {
    freezeTableName:true,
    tableName:'users'
  }
);

export default UserModel;
