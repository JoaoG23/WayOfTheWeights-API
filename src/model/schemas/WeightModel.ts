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
      type: DataTypes.DECIMAL(8,3),
      allowNull: false,
      validate:{
        notEmpty:true
      }
    }
  },
  {
    timestamps:false,
    freezeTableName:true,
    tableName:'weights'
  }
);

export default WeightModel;