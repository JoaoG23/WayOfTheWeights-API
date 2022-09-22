import {  DataTypes } from "sequelize";
import { db } from "../database";

const WeightModel = db.define('weights',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    weight: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      validate:{
        notEmpty:true
      }
    }
  },
  {
    freezeTableName:true,
    tableName:'weights'
  }
);

export default WeightModel;
