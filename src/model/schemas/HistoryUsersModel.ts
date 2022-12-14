import {  DataTypes } from "sequelize";
import { db } from "../database";



const HistoryUsersModel = db.define('history_users',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name_user: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    id_training: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    training_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    id_exercice: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    exercice_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    id_pound: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pound: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dateInsert: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    timestamps:false,
    freezeTableName:true,
    tableName:'history_users'
  }
);

export default HistoryUsersModel;
