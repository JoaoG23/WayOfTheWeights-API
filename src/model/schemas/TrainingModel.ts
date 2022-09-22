import {  DataTypes } from "sequelize";
import { db } from "../database";

const TrainingModel = db.define('trainings',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    descricao: {
      type: DataTypes.STRING(70),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      validate:{
        notEmpty:true
      }
    },
    userId:{
      allowNull:false,
      type:DataTypes.INTEGER,
      references:{
        model:'users',
        key:'id'
      }
    }
  },
  {
    freezeTableName:true,
    tableName:'trainings'
  }
);

export default TrainingModel;
