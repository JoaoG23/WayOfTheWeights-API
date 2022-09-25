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
    },
    telefone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(70),
      allowNull: false,
      unique: true
    },
    idPrevilegies:{
      allowNull:false,
      type:DataTypes.INTEGER,
      defaultValue:1,
      references:{
        model:'previlegies_users',
        key:'id'
      }
    },
  },
  
  {
    timestamps:false,
    freezeTableName:true,
    tableName:'users',
  }
);

export default UserModel;
