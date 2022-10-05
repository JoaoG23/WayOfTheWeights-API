import { QueryTypes } from "sequelize";
import { db } from "../../../../model/database";
class ListOneLastExerciceOfTrainingID {
  public static async execulte(idTraining:number | string): Promise<object> {
    try {
      const datas = await db.query(
        `SELECT users.id as iduser,
        users.name as username,
        trainings.id as idtraining,
        trainings.description as training,
        exercices.id as idexercices,
        exercices.description as exercice,
        weights.id as idweights,
        weights.weight
        FROM users JOIN trainings ON users.id = trainings."userId" 
        LEFT JOIN exercices ON trainings.id = exercices."trainingId"
        LEFT JOIN weights ON weights.id = exercices."weightId" where trainings.id = ? ORDER BY exercices.id desc limit 1;`,
        {
          replacements: [idTraining],
          type: QueryTypes.SELECT
        }
      );
      return datas.length > 0 ? datas : null;
    } catch (error) {
      return error;
    }
  }
}

export default ListOneLastExerciceOfTrainingID;
