import { QueryTypes } from "sequelize";
import { db } from "../../../../model/database";
class ListExercicesAndWeightByID {
  public static async execulte(idExercice:string): Promise<object> {
    try {
      const datas = await db.query(
        `SELECT exercices.id, exercices.description, exercices."trainingId", weights.weight
        FROM exercices LEFT JOIN weights on weights.id = exercices."weightId" where exercices.id = ?;`,
        {
          replacements: [idExercice],
          type: QueryTypes.SELECT
        }
      );
      return datas.length > 0 ? datas : null;
    } catch (error) {
      return error;
    }
  }
}

export default ListExercicesAndWeightByID;
