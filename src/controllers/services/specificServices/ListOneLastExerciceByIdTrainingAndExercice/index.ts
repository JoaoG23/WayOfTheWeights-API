import { QueryTypes } from "sequelize";
import { db } from "../../../../model/database";

class ListOneLastExerciceByIdTrainingAndExercice {
  public static async execulte(idTraining:number | string,idExercice:number | string): Promise<object> {
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
        LEFT JOIN weights ON weights.id = exercices."weightId" WHERE trainings.id = ? AND exercices.id = ?
        `,
        {
          replacements: [idTraining, idExercice],
          type: QueryTypes.SELECT
        }
      );
      return datas.length > 0 ? datas : null;
    } catch (error) {
      return error;
    }
  }
}

export default ListOneLastExerciceByIdTrainingAndExercice;
