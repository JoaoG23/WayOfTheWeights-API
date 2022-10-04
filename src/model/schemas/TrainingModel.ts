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
      title: {
        type: DataTypes.STRING(70),
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      description: {
      type: DataTypes.STRING(70),
      allowNull: false,
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
    timestamps:false,
    freezeTableName:true,
    tableName:'trainings'
  }
);

export default TrainingModel;
