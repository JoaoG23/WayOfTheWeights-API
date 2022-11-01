import { QueryTypes } from "sequelize";
import { db } from "../../../../model/database";
class TurnOnOrOffCheckForeignerKey {
  public static async execulte(onOrOff: number): Promise<object> {
    try {
      const datas = await db.query(
        `SET FOREIGN_KEY_CHECKS = ? `,
        {
          replacements: [onOrOff],
          // type: QueryTypes.SELECT,
        }
      );
      return datas.length > 0 ? datas : null;
    } catch (error) {
      return error;
    }
  }
}

export default TurnOnOrOffCheckForeignerKey;
