import { DataTypes } from "sequelize";
import { db } from "../database";

const ExercicesModel = db.define('exercices',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING(70),
      allowNull: false,
      validate:{
        notEmpty:true
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
    tableName:'exercices',
    timestamps:false
  }
);

export default ExercicesModel;
