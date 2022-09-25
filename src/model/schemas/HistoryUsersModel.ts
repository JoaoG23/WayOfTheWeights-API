import {  DataTypes } from "sequelize";
import { db } from "../database";

const HistoryUsersModel = db.define('historyusers',
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
      type: DataTypes.STRING(70),
      allowNull: false
    },
    id_training: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    training_name: {
      type: DataTypes.STRING(70),
      allowNull: false
    },
    id_exercice: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    exercice_name: {
      type: DataTypes.STRING(70),
      allowNull: false
    },
    id_pound: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pound: {
      type: DataTypes.DECIMAL(8,3),
      allowNull: false
    },
  },
  {
    freezeTableName:true,
    tableName:'historyusers'
  }
);

export default HistoryUsersModel;
