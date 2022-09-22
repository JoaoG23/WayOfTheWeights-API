import {  DataTypes } from "sequelize";
import { db } from "../database";

const ExercicesModel = db.define('trainings',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    description: {
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
    },
    weightId:{
      allowNull:false,
      type:DataTypes.INTEGER,
      references:{
        model:'weights',
        key:'id'
      }
    },
    trainingId:{
      allowNull:false,
      type:DataTypes.INTEGER,
      references:{
        model:'trainings',
        key:'id'
      }
    }
  },
  {
    freezeTableName:true,
    tableName:'trainings'
  }
);

export default ExercicesModel;
