import { QueryTypes } from "sequelize";
import { db } from "../../../../model/database";
class ListExercicesWithWeightAll {
  public static async execulte(): Promise<object> {
    try {
      const datas = await db.query(
        `SELECT exercices.id, exercices.description, exercices."trainingId", weights.weight
        FROM exercices LEFT JOIN weights on weights.id = exercices."weightId";`,
        {
          type: QueryTypes.SELECT
        }
      );
      return datas.length > 0 ? datas : null;
    } catch (error) {
      return error;
    }
  }
}

export default ListExercicesWithWeightAll;
